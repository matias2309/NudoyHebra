import type { MediaAsset } from "../types";

/**
 * Registro de fotografías reales (public/img).
 * Para añadir una foto: copiarla a public/img y registrarla aquí con su tamaño y texto alternativo.
 */
const list: MediaAsset[] = [
  {
    id: "verde-completo",
    src: "img/arbol-verde-led-completo.jpg",
    width: 1560,
    height: 2080,
    alt: "Árbol navideño de macramé verde bosque con luces LED azules, estrella de madera, guirnaldas de cuentas y flecos largos, colgado sobre un muro claro.",
    position: "50% 42%",
  },
  {
    id: "rosa-completo",
    src: "img/arbol-rosa-completo.jpg",
    width: 1560,
    height: 2080,
    alt: "Árbol navideño de macramé en rosa empolvado con estrella de madera, guirnaldas de cuentas natural y miel, y flecos con cuentas.",
    position: "50% 45%",
  },
  {
    id: "verde-copa",
    src: "img/arbol-verde-led-copa.jpg",
    width: 1560,
    height: 2080,
    alt: "Detalle de la copa del árbol verde: nudos de macramé iluminados por luces LED azules bajo una estrella de madera.",
    position: "50% 35%",
  },
  {
    id: "verde-estrella",
    src: "img/arbol-verde-led-estrella.jpg",
    width: 1512,
    height: 2016,
    alt: "Primer plano de la estrella calada de madera natural sobre los nudos verdes con luz LED y cuentas de madera.",
    position: "50% 30%",
  },
  {
    id: "verde-cuentas",
    src: "img/arbol-verde-led-cuentas.jpg",
    width: 1560,
    height: 2080,
    alt: "Macro de las guirnaldas de cuentas de madera natural y miel, con la base de nudos y flecos verdes iluminada en azul.",
    position: "50% 50%",
  },
];

export const media: Record<string, MediaAsset> = Object.fromEntries(
  list.map((m) => [m.id, m]),
);

export function mediaUrl(asset: MediaAsset): string {
  return import.meta.env.BASE_URL + asset.src;
}
