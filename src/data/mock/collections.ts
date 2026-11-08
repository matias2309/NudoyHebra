import type { Collection } from "../../types";

/**
 * EDICIONES DEMOSTRATIVAS — nombres y textos provisionales, no confirmados por el negocio.
 * Cada página usa una plantilla (cover, editorial, feature, duo, details, back).
 * En escritorio las páginas se agrupan en dobles páginas: [portada], [1-2], [3-4]…
 * Los "placeholder" reservan espacio para piezas que aún no tienen fotografía.
 */
export const collections: Collection[] = [
  {
    id: "navidad-tejida",
    title: "Navidad tejida",
    subtitle: "Árboles anudados a mano",
    description:
      "Una edición dedicada a los árboles de macramé: cordón, madera y una luz suave para acompañar la temporada.",
    issue: "Edición 01",
    season: "Temporada navideña",
    coverImage: "verde-completo",
    demo: true,
    pages: [
      { template: "cover" },
      {
        template: "editorial",
        kicker: "Editorial",
        title: "Una Navidad hecha a mano",
        body: [
          "Cada árbol de esta edición nace nudo a nudo. El cordón se dobla, se anuda y vuelve a empezar hasta formar hojas que parecen moverse.",
          "La madera aporta la calidez: una estrella calada en la punta y guirnaldas de cuentas que cruzan el árbol de lado a lado.",
        ],
        image: "verde-estrella",
        caption: "Estrella calada de madera natural.",
      },
      {
        template: "feature",
        productId: "arbol-verde-led",
        kicker: "Pieza destacada",
        headline: "Luz entre los nudos",
      },
      {
        template: "details",
        productId: "arbol-verde-led",
        kicker: "De cerca",
        title: "Terminaciones",
        items: [
          { image: "verde-copa", caption: "Luces LED azules entre las hojas anudadas." },
          { image: "verde-cuentas", caption: "Cuentas de madera en tono natural y miel." },
        ],
      },
      {
        template: "feature",
        productId: "arbol-rosa",
        kicker: "Mismo diseño, otro tono",
        headline: "Rosa empolvado",
      },
      {
        template: "duo",
        kicker: "Próximamente",
        title: "Nuevas piezas de temporada",
        slots: [{ type: "placeholder" }, { type: "placeholder" }],
      },
      {
        template: "duo",
        kicker: "Selección",
        title: "Dos tonos, un mismo árbol",
        slots: [
          { type: "product", productId: "arbol-verde-led" },
          { type: "product", productId: "arbol-rosa" },
        ],
      },
      { template: "back" },
    ],
  },
  {
    id: "decoracion-artesanal",
    title: "Decoración artesanal",
    subtitle: "Texturas para el hogar",
    description:
      "Piezas textiles para vestir muros y rincones. Una edición de ejemplo que combina productos reales con espacios para nuevas fotografías.",
    issue: "Edición 02",
    season: "Hogar",
    coverImage: "verde-copa",
    demo: true,
    pages: [
      { template: "cover" },
      {
        template: "editorial",
        kicker: "Editorial",
        title: "Texturas que abrigan",
        body: [
          "El cordón grueso tiene volumen, sombra y relieve. Colgado en un muro claro, cada nudo dibuja su propia textura.",
          "Esta edición reúne piezas pensadas para decorar, con espacio para sumar nuevas técnicas y colecciones.",
        ],
        image: "verde-cuentas",
        caption: "Relieve del cordón y cuentas de madera.",
      },
      {
        template: "duo",
        kicker: "Para el muro",
        title: "Piezas para colgar",
        slots: [
          { type: "product", productId: "arbol-rosa" },
          { type: "placeholder" },
        ],
      },
      {
        template: "duo",
        kicker: "Con luz",
        title: "Detalles que iluminan",
        slots: [
          { type: "placeholder" },
          { type: "product", productId: "arbol-verde-led" },
        ],
      },
      {
        template: "editorial",
        kicker: "En preparación",
        title: "Espacio para nuevas técnicas",
        body: [
          "Esta página queda reservada para presentar otras técnicas del taller cuando existan fotografías.",
        ],
      },
      { template: "back" },
    ],
  },
  {
    id: "creaciones-textiles",
    title: "Creaciones textiles",
    subtitle: "Hilo, nudo y madera",
    description:
      "Una mirada a los materiales y las terminaciones. Edición de ejemplo para mostrar cómo se verían otras líneas de productos.",
    issue: "Edición 03",
    season: "Colección abierta",
    coverImage: "verde-cuentas",
    demo: true,
    pages: [
      { template: "cover" },
      {
        template: "editorial",
        kicker: "Materiales",
        title: "Hilo, nudo y madera",
        body: [
          "Cordón textil de trama gruesa, madera natural y cuentas en dos tonos. Materiales simples que, combinados con paciencia, se convierten en piezas únicas.",
        ],
        image: "verde-copa",
        caption: "Nudos de macramé con luz LED.",
      },
      {
        template: "duo",
        kicker: "Próximamente",
        title: "Piezas por fotografiar",
        slots: [{ type: "placeholder" }, { type: "placeholder" }],
      },
      {
        template: "details",
        productId: "arbol-verde-led",
        kicker: "De cerca",
        title: "El detalle importa",
        items: [
          { image: "verde-estrella", caption: "Estrella de madera sobre el remate anudado." },
          { image: "verde-cuentas", caption: "Guirnaldas de cuentas en dos tonos." },
        ],
      },
      {
        template: "duo",
        kicker: "Selección",
        title: "Del taller",
        slots: [
          { type: "product", productId: "arbol-rosa" },
          { type: "product", productId: "arbol-verde-led" },
        ],
      },
      { template: "back" },
    ],
  },
];
