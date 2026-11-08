import type { Product } from "../../types";

/**
 * PRODUCTOS SIMULADOS — nombres y textos provisionales basados únicamente en lo que muestran las fotos.
 * Los precios son DEMOSTRATIVOS (no son precios reales del negocio).
 * - showPrice: true  → el precio se muestra en CLP.
 * - showPrice: false → el precio desaparece por completo de la interfaz pública.
 */
export const products: Product[] = [
  {
    id: "arbol-verde-led",
    name: "Árbol de macramé verde bosque con luz",
    description:
      "Árbol navideño anudado a mano en cordón verde bosque, con pequeñas luces LED azules entre sus hojas, guirnaldas de cuentas de madera y una estrella calada en la punta. Pensado para colgar en el muro.",
    images: ["verde-completo", "verde-copa", "verde-estrella", "verde-cuentas"],
    price: 34990, // DEMO
    showPrice: true,
    technique: "Macramé",
    features: [
      "Cordón textil grueso en verde bosque",
      "Luces LED azules integradas",
      "Estrella calada de madera natural",
      "Guirnaldas de cuentas de madera en tono natural y miel",
      "Barra de madera y flecos largos",
    ],
  },
  {
    id: "arbol-rosa",
    name: "Árbol de macramé rosa empolvado",
    description:
      "El mismo diseño de árbol anudado, en un rosa empolvado suave. Guirnaldas de cuentas de madera, panel de nudos en V y flecos con cuentas que caen bajo la barra.",
    images: ["rosa-completo"],
    price: 32990, // DEMO — oculto en la interfaz (showPrice: false)
    showPrice: false,
    technique: "Macramé",
    features: [
      "Cordón textil en rosa empolvado",
      "Estrella calada de madera natural",
      "Guirnaldas de cuentas de madera en tono natural y miel",
      "Panel de nudos en V y flecos con cuentas",
      "Barra de madera para colgar",
    ],
  },
];
