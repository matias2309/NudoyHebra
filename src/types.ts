/**
 * Contratos de datos del catálogo.
 * Hoy se alimentan desde mocks (src/data/mock); mañana desde la API.
 */

export type VariantId = "a" | "b" | "c";

/** Recurso fotográfico real. `id` es la clave usada en Product.images. */
export type MediaAsset = {
  id: string;
  src: string; // ruta relativa a /public
  width: number;
  height: number;
  alt: string;
  /** object-position sugerido para recortes (no altera la foto). */
  position?: string;
};

/** Producto tal como lo guarda la administración (incluye precio interno). */
export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[]; // ids de MediaAsset
  price: number | null;
  showPrice: boolean;
  /** Solo características observables en las fotos; nada inventado. */
  features: string[];
  technique?: string;
};

/**
 * Producto como lo recibe la interfaz pública.
 * Si showPrice es false, price llega siempre como null: el valor interno nunca se expone.
 */
export type PublicProduct = Omit<Product, "price"> & { price: number | null };

export type Slot =
  | { type: "product"; productId: string }
  | { type: "placeholder"; label?: string };

/** Página editorial dentro de una edición. Cada plantilla es una composición. */
export type MagazinePage =
  | { template: "cover" }
  | {
      template: "editorial";
      kicker: string;
      title: string;
      body: string[];
      image?: string;
      caption?: string;
    }
  | { template: "feature"; productId: string; kicker?: string; headline: string }
  | { template: "duo"; kicker?: string; title?: string; slots: [Slot, Slot] }
  | {
      template: "details";
      productId: string;
      kicker?: string;
      title: string;
      items: { image: string; caption: string }[];
    }
  | { template: "back" };

/** Edición/catálogo: agrupa productos en páginas. Un producto puede estar en varias ediciones. */
export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  issue: string; // ej. "Edición 01"
  season: string;
  coverImage: string; // id de MediaAsset
  /** Contenido de demostración: no es información confirmada del negocio. */
  demo: boolean;
  pages: MagazinePage[];
};

export type CollectionWithProducts = {
  collection: Collection;
  products: Record<string, PublicProduct>;
};
