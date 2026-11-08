import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReducedMotion } from "../lib/hooks";

/**
 * Motor de paginación de la revista (independiente del diseño).
 *
 * - La página actual vive en la URL (?p=n): sobrevive a recargas, al detalle de producto
 *   y al cambio de propuesta A/B/C.
 * - "spread" (escritorio): posición = doble página. Portada sola a la derecha,
 *   luego [1,2], [3,4]… y contraportada sola a la izquierda.
 * - "single" (móvil): posición = página.
 */
export type ViewMode = "spread" | "single";
export type Flip = { from: number; to: number; dir: 1 | -1 };

export const spreadOf = (page: number) => Math.ceil(page / 2);
export const pagesOfSpread = (s: number, total: number): [number | null, number | null] => {
  const l = 2 * s - 1;
  const r = 2 * s;
  return [l >= 0 && l < total ? l : null, r < total ? r : null];
};

export function useMagazine(total: number, mode: ViewMode) {
  const [params, setParams] = useSearchParams();
  const reduced = useReducedMotion();
  const [flip, setFlip] = useState<Flip | null>(null);

  const raw = Number.parseInt(params.get("p") ?? "0", 10);
  const page = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), total - 1) : 0;

  const pos = mode === "spread" ? spreadOf(page) : page;
  const maxPos = mode === "spread" ? spreadOf(total - 1) : total - 1;

  const firstPageOf = useCallback(
    (p: number) => {
      if (mode === "single") return p;
      const [l, r] = pagesOfSpread(p, total);
      return (l ?? r ?? 0) as number;
    },
    [mode, total],
  );

  const commit = useCallback(
    (toPos: number) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("p", String(firstPageOf(toPos)));
          return next;
        },
        { replace: true },
      );
    },
    [setParams, firstPageOf],
  );

  // Si cambia el modo (rotación/resize) a mitad de un giro, se descarta la animación.
  useEffect(() => {
    setFlip(null);
  }, [mode]);

  const goTo = useCallback(
    (toPos: number) => {
      if (flip) return;
      const target = Math.min(Math.max(toPos, 0), maxPos);
      if (target === pos) return;
      if (reduced) commit(target);
      else setFlip({ from: pos, to: target, dir: target > pos ? 1 : -1 });
    },
    [flip, maxPos, pos, reduced, commit],
  );

  const onFlipEnd = useCallback(() => {
    if (!flip) return;
    commit(flip.to);
    setFlip(null);
  }, [flip, commit]);

  const next = useCallback(() => goTo(pos + 1), [goTo, pos]);
  const prev = useCallback(() => goTo(pos - 1), [goTo, pos]);

  return { page, pos, maxPos, flip, goTo, next, prev, onFlipEnd, reduced };
}
