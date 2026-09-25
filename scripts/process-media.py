#!/usr/bin/env python3
import os
import subprocess
import json

SOURCE_DIR = 'files from pc'
OUT_PHOTOS_DIR = 'public/media/photos'
OUT_VIDEOS_DIR = 'public/media/videos'

os.makedirs(OUT_PHOTOS_DIR, exist_ok=True)
os.makedirs(OUT_VIDEOS_DIR, exist_ok=True)

all_files = sorted(os.listdir(SOURCE_DIR))

photos = []
videos = []

photo_exts = {'.jpg', '.jpeg', '.png'}
video_exts = {'.mp4', '.mov'}

for f in all_files:
    if f.startswith('.'):
        continue
    ext = os.path.splitext(f)[1].lower()
    if ext in photo_exts:
        photos.append(f)
    elif ext in video_exts:
        videos.append(f)

print(f"Found {len(photos)} photos and {len(videos)} videos.")

# 1. Process Photos with /usr/bin/sips
processed_photos = []
for idx, p in enumerate(photos):
    src_path = os.path.join(SOURCE_DIR, p)
    clean_name = f"photo_{idx+1:02d}.jpg"
    out_path = os.path.join(OUT_PHOTOS_DIR, clean_name)
    
    if not os.path.exists(out_path):
        cmd = [
            '/usr/bin/sips',
            '-s', 'format', 'jpeg',
            '-s', 'formatOptions', '85',
            '-Z', '1400',
            src_path,
            '--out', out_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    size_kb = os.path.getsize(out_path) / 1024
    print(f"[Photo {idx+1}/{len(photos)}] {p} -> {clean_name} ({size_kb:.0f} KB)")
    processed_photos.append({
        'id': f"photo-{idx+1:02d}",
        'src': f"/media/photos/{clean_name}",
        'alt': f"Tanečná spomienka {idx+1}",
        'isVideo': False,
        'category': 'Fotka',
        'date': '2023 - 2026',
    })

# 2. Process Videos with /usr/bin/avconvert & qlmanage
processed_videos = []
for idx, v in enumerate(videos):
    src_path = os.path.join(SOURCE_DIR, v)
    clean_base = f"video_{idx+1:02d}"
    out_full = os.path.join(OUT_VIDEOS_DIR, f"{clean_base}.mp4")
    out_loop = os.path.join(OUT_VIDEOS_DIR, f"{clean_base}_loop.mp4")
    out_poster = os.path.join(OUT_PHOTOS_DIR, f"{clean_base}_poster.jpg")

    # Get duration
    res = subprocess.run(['mdls', '-name', 'kMDItemDurationSeconds', src_path], capture_output=True, text=True)
    dur_str = res.stdout.strip().split('=')[-1].strip()
    try:
        dur = float(dur_str)
    except:
        dur = 10.0

    print(f"\n[Video {idx+1}/{len(videos)}] Processing {v} (duration: {dur:.1f}s)...")
    
    # 2a. Convert full video
    # For GitHub safety (<100MB limit) and snappy mobile streaming:
    # If duration > 25s use Preset640x480 (~1.2 Mbps, keeps even a 4-minute video under 35MB).
    # If duration <= 25s use Preset960x540.
    preset = 'Preset640x480' if dur > 25.0 else 'Preset960x540'
    cmd_full = [
        '/usr/bin/avconvert',
        '-s', src_path,
        '-p', preset,
        '-o', out_full,
        '--replace'
    ]
    subprocess.run(cmd_full, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    full_mb = os.path.getsize(out_full) / (1024 * 1024)

    # 2b. Generate 6s lightweight loop video for smooth 3D globe spinning
    if dur > 8.0:
        cmd_loop = [
            '/usr/bin/avconvert',
            '-s', src_path,
            '-p', 'Preset640x480',
            '-o', out_loop,
            '--start', '1.0',
            '--duration', '6.0',
            '--replace'
        ]
        subprocess.run(cmd_loop, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        loop_path = f"/media/videos/{clean_base}_loop.mp4"
        loop_mb = os.path.getsize(out_loop) / (1024 * 1024)
    else:
        loop_path = f"/media/videos/{clean_base}.mp4"
        loop_mb = full_mb

    # 2c. Generate poster image with qlmanage & sips
    tmp_ql_dir = '/tmp/ql_thumbs'
    os.makedirs(tmp_ql_dir, exist_ok=True)
    subprocess.run(['/usr/bin/qlmanage', '-t', '-s', '800', '-o', tmp_ql_dir, src_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    ql_thumb_name = f"{v}.png"
    ql_thumb_path = os.path.join(tmp_ql_dir, ql_thumb_name)
    if os.path.exists(ql_thumb_path):
        subprocess.run([
            '/usr/bin/sips',
            '-s', 'format', 'jpeg',
            '-s', 'formatOptions', '80',
            '-Z', '700',
            ql_thumb_path,
            '--out', out_poster
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.remove(ql_thumb_path)
    
    poster_src = f"/media/photos/{clean_base}_poster.jpg" if os.path.exists(out_poster) else f"/media/photos/photo_01.jpg"

    print(f" -> Full: {full_mb:.1f} MB, Loop: {loop_mb:.1f} MB, Poster ready")
    processed_videos.append({
        'id': f"video-{idx+1:02d}",
        'src': poster_src,
        'videoUrl': f"/media/videos/{clean_base}.mp4",
        'videoLoopUrl': loop_path,
        'alt': f"Tanečné video {idx+1}",
        'isVideo': True,
        'category': 'Video',
        'date': '2023 - 2026',
        'duration': round(dur, 1),
        'size_mb': round(full_mb, 1)
    })

# Save manifest
with open('src/data/processed_media.json', 'w') as f:
    json.dump({'photos': processed_photos, 'videos': processed_videos}, f, indent=2)

print("\nProcessing complete! Manifest written to src/data/processed_media.json")
