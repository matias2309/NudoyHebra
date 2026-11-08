import { useEffect, useRef, type PointerEvent as RPointerEvent } from "react";
import type { CollectionWithProducts } from "../types";
import { useMediaQuery } from "../lib/hooks";
import { useVariant, roman, pad2 } from "../components/shared";
import { PageView, type PageCtx } from "./templates/Pages";
import { pagesOfSpread, useMagazine, type ViewMode } from "./useMagazine";

const inert = { inert: "" } as object;

type Props = {
  data: CollectionWithProducts;
  onSelect: (productId: string) => void;
  detailOpen: boolean;
};

/**
 * Visor de revista: portada → doble página (escritorio) / página única (móvil),
 * con giro de hoja en CSS 3D, teclado, swipe e índice de páginas.
 */
export function MagazineViewer({ data, onSelect, detailOpen }: Props) {
  const variant = useVariant();
  const isMobile = useMediaQuery("(max-width: 760px)");
  const mode: ViewMode = isMobile ? "single" : "spread";
  const pages = data.collection.pages;
  const total = pages.length;
  const mag = useMagazine(total, mode);
  const { pos, maxPos, flip, goTo, next, prev, onFlipEnd } = mag;

  const ctx: PageCtx = { ...data, onSelect, total };

  /* ---------- teclado ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (detailOpen || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t instanceof Element && t.closest("input, textarea, select, [contenteditable]")) return;
      const map: Record<string, () => void> = {
        ArrowRight: next,
        PageDown: next,
        ArrowLeft: prev,
        PageUp: prev,
        Home: () => goTo(0),
        End: () => goTo(maxPos),
      };
      const fn = map[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, maxPos, detailOpen]);

  /* ---------- seguro por si animationend no llega (pestaña oculta, etc.) ---------- */
  const endRef = useRef(onFlipEnd);
  endRef.current = onFlipEnd;
  useEffect(() => {
    if (!flip) return;
    const t = window.setTimeout(() => endRef.current(), 1600);
    return () => window.clearTimeout(t);
  }, [flip]);

  /* ---------- swipe ---------- */
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: RPointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: RPointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) (dx < 0 ? next : prev)();
  };

  const render = (i: number | null, side: "left" | "right" | "single") =>
    i == null ? (
      <div className="pg pg--blank" data-side={side} aria-hidden="true" />
    ) : (
      <PageView key={i} page={pages[i]} index={i} side={side} ctx={ctx} />
    );

  const handleAnimEnd = (e: React.AnimationEvent) => {
    if (e.target === e.currentTarget && e.animationName.startsWith("leaf-")) onFlipEnd();
  };

  /* ---------- composición del libro ---------- */
  let stage: React.ReactNode;
  const target = flip ? flip.to : pos;
  let bookPos = "open";

  if (mode === "spread") {
    const [tl, tr] = pagesOfSpread(target, total);
    bookPos = target === 0 ? "front" : tr == null ? "back" : "open";
    if (!flip) {
      const [l, r] = pagesOfSpread(pos, total);
      stage = (
        <>
          <div className="half half--left" key={`l${l}`}>{render(l, "left")}</div>
          <div className="half half--right" key={`r${r}`}>{render(r, "right")}</div>
        </>
      );
    } else {
      const [fl, fr] = pagesOfSpread(flip.from, total);
      const fwd = flip.dir === 1;
      stage = (
        <>
          <div className="half half--left" {...inert}>{render(fwd ? fl : tl, "left")}</div>
          <div className="half half--right" {...inert}>{render(fwd ? tr : fr, "right")}</div>
          <div
            className={`leaf ${fwd ? "leaf--fwd" : "leaf--bwd"}`}
            onAnimationEnd={handleAnimEnd}
            aria-hidden="true"
            {...inert}
          >
            <div className="face face--front">{render(fwd ? fr : fl, fwd ? "right" : "left")}</div>
            <div className="face face--back">{render(fwd ? tl : tr, fwd ? "left" : "right")}</div>
          </div>
        </>
      );
    }
  } else {
    if (!flip) {
      stage = <div className="half half--single" key={`s${pos}`}>{render(pos, "single")}</div>;
    } else {
      const fwd = flip.dir === 1;
      stage = (
        <>
          <div className="half half--single" {...inert}>{render(fwd ? flip.to : flip.from, "single")}</div>
          <div
            className={`leaf leaf--single ${fwd ? "leaf--out" : "leaf--in"}`}
            onAnimationEnd={handleAnimEnd}
            aria-hidden="true"
            {...inert}
          >
            <div className="face face--front">{render(fwd ? flip.from : flip.to, "single")}</div>
          </div>
        </>
      );
    }
  }

  /* ---------- índice y textos ---------- */
  const fmt = (n: number) => (variant === "b" ? roman(n) : pad2(n));
  const labelFor = (p: number): string => {
    if (mode === "single") {
      if (p === 0) return "Portada";
      if (p === total - 1 && pages[p].template === "back") return "Contraportada";
      return fmt(p);
    }
    const [l, r] = pagesOfSpread(p, total);
    if (l == null) return "Portada";
    if (r == null && pages[l].template === "back") return "Contraportada";
    return r == null ? fmt(l) : `${fmt(l)}–${fmt(r)}`;
  };
  const ariaFor = (p: number): string => {
    const l = labelFor(p);
    return /^(Portada|Contraportada)$/.test(l) ? l : `Página${l.includes("–") ? "s" : ""} ${l}`;
  };

  const positions = Array.from({ length: maxPos + 1 }, (_, i) => i);

  return (
    <section
      className="reader"
      aria-roledescription="revista"
      aria-label={`Revista ${data.collection.title}`}
      data-mode={mode}
    >
      <div className="reader__stage">
        <button
          type="button"
          className="turn turn--prev"
          onClick={prev}
          disabled={pos === 0}
          aria-label="Página anterior"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          className="book"
          data-pos={bookPos}
          data-flipping={flip ? "true" : undefined}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (start.current = null)}
        >
          {stage}
        </div>

        <button
          type="button"
          className="turn turn--next"
          onClick={next}
          disabled={pos === maxPos}
          aria-label="Página siguiente"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="reader__bar">
        <p className="reader__status" aria-live="polite">
          <span className="reader__current">{ariaFor(target)}</span>
          <span className="reader__of"> · {total - 2} páginas</span>
        </p>
        <nav className="reader__index" aria-label="Ir a una página">
          <ol>
            {positions.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => goTo(p)}
                  aria-current={p === target ? "page" : undefined}
                  aria-label={ariaFor(p)}
                >
                  {labelFor(p)}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        {pos === 0 && !flip && (
          <p className="reader__hint">
            {mode === "single" ? "Desliza o usa las flechas para hojear" : "Abre la revista con › o las flechas del teclado"}
          </p>
        )}
      </div>
    </section>
  );
}
