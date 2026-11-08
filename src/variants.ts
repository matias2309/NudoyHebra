import type { VariantId } from "./types";

/** Identidad provisional (no confirmada por la clienta). */
export const BRAND = {
  name: "Nudo & Hebra",
  note: "Nombre y marca provisionales",
};

export type VariantMeta = {
  id: VariantId;
  letter: string;
  name: string;
  mood: string;
  transmits: string;
  advantages: string[];
};

export const VARIANTS: Record<VariantId, VariantMeta> = {
  a: {
    id: "a",
    letter: "A",
    name: "Editorial artesanal",
    mood: "Cálida · cercana · taller",
    transmits:
      "El encanto de un taller: papel crema, tipografía editorial con carácter y fotografías amplias, como una revista de decoración hecha con cariño.",
    advantages: [
      "Muy cercana y acogedora",
      "Las fotos se lucen a gran tamaño",
      "Se lee como una revista impresa",
    ],
  },
  b: {
    id: "b",
    letter: "B",
    name: "Boutique de autor",
    mood: "Refinada · serena · de autor",
    transmits:
      "Valor y calidad artesanal. Mucho espacio en blanco, una pieza por página y detalles finos en burdeos y dorado, sin sentirse inaccesible.",
    advantages: [
      "Eleva la percepción de cada pieza",
      "Navegación discreta y limpia",
      "Envejece bien con más productos",
    ],
  },
  c: {
    id: "c",
    letter: "C",
    name: "Artesanía contemporánea",
    mood: "Moderna · dinámica · cálida",
    transmits:
      "Artesanía actual: composiciones asimétricas, portadas con impacto y una experiencia móvil pensada para el pulgar.",
    advantages: [
      "La mejor experiencia en celular",
      "Portadas llamativas para redes",
      "Ritmo visual variado y fresco",
    ],
  },
};

export const VARIANT_IDS = Object.keys(VARIANTS) as VariantId[];

export const isVariant = (v: string | undefined): v is VariantId =>
  !!v && v in VARIANTS;
