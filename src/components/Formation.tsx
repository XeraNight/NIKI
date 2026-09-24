'use client';

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import type {
  FmLayout,
  Pose,
  Work,
} from "./formation-utils/formation-poses";
import {
  clamp,
  copyPose,
  focusScore,
  getLayout,
  HOVER_EASE,
  HOVER_ZOOM,
  lerpPose,
  PARALLAX_MAX,
  PERSP,
  poseFor,
  poseTransform,
  SPRING,
} from "./formation-utils/formation-poses";

const SANS =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

interface CustomCSS extends CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

interface CardState {
  index: number;
  work: Work;
  cur: Pose;
  from: Pose;
  hov: number;
  swap: number;
  prevZ: number;
  outer: HTMLDivElement | null;
  inner: HTMLDivElement | null;
}

interface LoopState {
  raf: number;
  lastTime: number;
  onScreen: boolean;
  visible: boolean;
  reduced: boolean;
  browse: number;
  vel: number;
  morphing: boolean;
  morphMs: number;
  seeded: boolean;
  hoverCard: CardState | null;
  lastFocused: CardState | null;
  curTX: number;
  curTY: number;
  cursor: { x: number; y: number; inside: boolean };
  press: { x: number; y: number; id: number; committed: boolean } | null;
  lastX: number;
}

const zeroPose = (): Pose => ({
  o: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  s: 1,
  x: 0,
  y: 0,
  z: 0,
});

const createState = (): LoopState => ({
  browse: 0,
  curTX: 0,
  curTY: 0,
  cursor: { inside: false, x: 0, y: 0 },
  hoverCard: null,
  lastFocused: null,
  lastTime: 0,
  lastX: 0,
  morphMs: 0,
  morphing: false,
  onScreen: true,
  press: null,
  raf: 0,
  reduced: false,
  seeded: false,
  vel: 0,
  visible: true,
});

const makeCards = (works: Work[]): CardState[] =>
  works.map((work, index) => ({
    cur: zeroPose(),
    from: zeroPose(),
    hov: 0,
    index,
    inner: null,
    outer: null,
    prevZ: 0,
    swap: 0,
    work,
  }));

const isDragging = (s: LoopState) => s.press?.committed === true;

const isUI = (target: EventTarget | null) =>
  target instanceof Element && target.closest("[data-fm-ui]") !== null;

export interface FormationProps {
  works: Work[];
  onSelect?: (work: Work) => void;
}

export const Formation = ({ works, onSelect }: FormationProps): ReactNode => {
  const rootRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const sRef = useRef<LoopState | null>(null);
  if (!sRef.current) {
    sRef.current = createState();
  }
  const S = sRef.current;

  const worksRef = useRef<Work[] | null>(null);
  const cardsRef = useRef<CardState[]>([]);
  if (worksRef.current !== works) {
    worksRef.current = works;
    cardsRef.current = makeCards(works);
  }
  const cards = cardsRef.current;
  const n = cards.length;

  const layoutRef = useRef<FmLayout | null>(null);
  const boxRef = useRef({ h: 0, left: 0, top: 0, w: 0 });

  const applyCardSizes = () => {
    const L = layoutRef.current;
    if (!L) return;
    for (const card of cards) {
      const { outer } = card;
      if (!outer) continue;
      outer.style.width = `${L.cardW}px`;
      outer.style.height = `${L.cardH}px`;
      outer.style.marginLeft = `${-L.cardW / 2}px`;
      outer.style.marginTop = `${-L.cardH / 2}px`;
    }
  };

  const hoverHit = (px: number, py: number) => {
    const box = boxRef.current;
    const inRect = (el: HTMLDivElement) => {
      const r = el.getBoundingClientRect();
      const l = r.left - box.left;
      const t = r.top - box.top;
      return px >= l && px <= l + r.width && py >= t && py <= t + r.height;
    };
    const stickyCard = S.hoverCard;
    if (
      stickyCard &&
      stickyCard.cur.o >= 0.5 &&
      stickyCard.outer &&
      inRect(stickyCard.outer)
    ) {
      return stickyCard;
    }
    let best: CardState | null = null;
    let bestZ = -Infinity;
    for (const card of cards) {
      if (card.cur.o < 0.5) continue;
      const el = card.outer;
      if (!el) continue;
      if (inRect(el) && card.cur.z > bestZ) {
        bestZ = card.cur.z;
        best = card;
      }
    }
    return best;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (isUI(e.target)) return;
    if (S.press) return;
    const box = boxRef.current;
    const lx = e.clientX - box.left;
    const ly = e.clientY - box.top;
    S.cursor.x = lx;
    S.cursor.y = ly;
    S.cursor.inside = true;
    S.lastX = lx;
    S.press = { committed: false, id: e.pointerId, x: lx, y: ly };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const { press } = S;
    if (press && press.id !== e.pointerId) return;
    const box = boxRef.current;
    const lx = e.clientX - box.left;
    const ly = e.clientY - box.top;
    S.cursor.x = lx;
    S.cursor.y = ly;
    S.cursor.inside = true;
    if (press) {
      if (!press.committed) {
        const dist = Math.hypot(lx - press.x, ly - press.y);
        if (dist > 6) {
          press.committed = true;
          try {
            rootRef.current?.setPointerCapture(press.id);
          } catch {}
        }
      }
      if (press.committed) {
        const d = (lx - S.lastX) * 1.3;
        S.browse += d;
        S.vel = d;
      }
    }
    S.lastX = lx;
  };

  const endPress = (e: ReactPointerEvent<HTMLElement>) => {
    const { press } = S;
    if (!press || press.id !== e.pointerId) return;
    const root = rootRef.current;
    if (root?.hasPointerCapture(press.id)) {
      root.releasePointerCapture(press.id);
    }
    S.press = null;
  };

  const onPointerLeave = () => {
    if (S.press && !S.press.committed) {
      S.press = null;
    }
    if (isDragging(S)) return;
    S.cursor.inside = false;
    S.hoverCard = null;
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const st = S;

    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = boxRef.current;

    const measure = () => {
      const r = root.getBoundingClientRect();
      box.left = r.left;
      box.top = r.top;
      if (r.width < 1 || r.height < 1) return false;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      const changed = w !== box.w || h !== box.h;
      box.w = w;
      box.h = h;
      return changed;
    };

    const relayout = () => {
      if (!measure()) return;
      layoutRef.current = getLayout(box.w, box.h, n);
      if (!st.cursor.inside) {
        st.cursor.x = box.w / 2;
        st.cursor.y = box.h / 2;
      }
      applyCardSizes();
    };

    relayout();

    const advancePoses = (L: FmLayout) => {
      for (const card of cards) {
        const t2 = poseFor("flat", card.index, L, st.browse);
        const { cur } = card;
        if (!st.seeded) {
          copyPose(cur, t2);
        } else {
          lerpPose(cur, cur, t2, SPRING);
        }
      }
      st.seeded = true;
    };

    const frame = (now: number) => {
      const L = layoutRef.current;
      if (!L) {
        st.raf = requestAnimationFrame(frame);
        return;
      }
      st.lastTime = now;
      const dragging = isDragging(st);

      const rr = root.getBoundingClientRect();
      box.left = rr.left;
      box.top = rr.top;

      if (dragging) {
        st.hoverCard = null;
      } else if (st.cursor.inside) {
        st.hoverCard = hoverHit(st.cursor.x, st.cursor.y);
      }

      root.style.cursor = dragging ? "grabbing" : "grab";

      // Smooth inertia momentum
      if (!dragging) {
        st.browse += st.vel;
        st.vel *= 0.94;
        if (Math.abs(st.vel) < 0.02) {
          st.vel = -0.4; // Continuous gentle drift
        }
      }

      const ty = (st.cursor.x / L.W - 0.5) * PARALLAX_MAX;
      const tx = (0.5 - st.cursor.y / L.H) * PARALLAX_MAX;
      st.curTX += (tx - st.curTX) * 0.06;
      st.curTY += (ty - st.curTY) * 0.06;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `rotateX(${st.curTX}deg) rotateY(${st.curTY}deg)`;
      }

      advancePoses(L);

      for (const card of cards) {
        card.hov += ((card === st.hoverCard ? 1 : 0) - card.hov) * HOVER_EASE;
      }

      for (const card of cards) {
        const { cur } = card;
        if (card.outer) {
          card.outer.style.transform = poseTransform(cur);
          card.outer.style.opacity = String(cur.o);
        }
        card.inner?.style.setProperty("--hv", String(card.hov));
        card.prevZ = cur.z;
      }

      st.raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!st.raf && !st.reduced) {
        st.lastTime = 0;
        st.raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      if (st.raf) {
        cancelAnimationFrame(st.raf);
        st.raf = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        st.onScreen = entry.isIntersecting;
        if (st.onScreen && st.visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(root);

    const onVis = () => {
      st.visible = document.visibilityState === "visible";
      if (st.onScreen && st.visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => relayout());
    ro.observe(root);
    window.addEventListener("resize", relayout);

    const onWheel = (e: WheelEvent) => {
      if (isUI(e.target)) return;
      if (st.reduced) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const impulse = -delta * 0.7;
      st.browse += impulse;
      st.vel = impulse * 0.25;
    };
    root.addEventListener("wheel", onWheel, { passive: false });

    if (!st.reduced) {
      start();
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", relayout);
      root.removeEventListener("wheel", onWheel);
      st.seeded = false;
      box.w = 0;
      box.h = 0;
    };
  }, [cards, n, S]);

  useEffect(() => {
    const inners = cards
      .map((c) => c.inner)
      .filter((el): el is HTMLDivElement => el !== null);
    if (!inners.length) return;
    if (S.reduced) {
      gsap.set(inners, { filter: "none", opacity: 1, scale: 1, yPercent: 0 });
      return;
    }
    gsap.set(inners, {
      filter: "blur(8px)",
      opacity: 0,
      scale: 0.85,
      yPercent: 4,
    });
    let cancelled = false;
    let tween: gsap.core.Tween | null = null;
    const play = () => {
      if (cancelled) return;
      tween = gsap.to(inners, {
        delay: 0.05,
        duration: 0.8,
        ease: "power3.out",
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        stagger: { each: 0.03, from: "center" },
        yPercent: 0,
      });
    };
    const playWhenReady = async () => {
      await document.fonts.ready;
      play();
    };
    void playWhenReady();
    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [cards, S]);

  const stageStyle: CustomCSS = {
    "--fm-bg": "#070709",
    "--fm-fg": "#f3f3f5",
    background: "transparent",
    color: "rgba(255,255,255,0.92)",
    fontFamily: SANS,
    touchAction: "pan-y",
  };

  return (
    <section
      ref={rootRef}
      className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full select-none overflow-hidden"
      style={stageStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPress}
      onPointerCancel={endPress}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="absolute inset-0"
        style={{ perspective: `${PERSP}px`, perspectiveOrigin: "50% 50%" }}
      >
        <div
          ref={parallaxRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cards.map((card) => (
            <div
              key={card.index}
              ref={(el) => {
                card.outer = el;
              }}
              role="img"
              aria-label={card.work.title}
              className="absolute left-1/2 top-1/2 cursor-pointer will-change-transform"
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
              onClick={() => {
                if (!isDragging(S)) {
                  onSelect?.(card.work);
                }
              }}
            >
              <div
                ref={(el) => {
                  card.inner = el;
                }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: 16,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)",
                  opacity: 0,
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: 16,
                    transform: `scale(calc(1 + ${HOVER_ZOOM} * var(--hv, 0)))`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${card.work.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      borderRadius: 16,
                      filter: "saturate(0.98) contrast(1.04)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 inset-x-0 p-4 text-left pointer-events-none">
                    {card.work.category && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold px-2 py-0.5 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-sm inline-block mb-1">
                        {card.work.category}
                      </span>
                    )}
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1">
                      {card.work.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formation;
