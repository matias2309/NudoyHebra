import type {
  Collection,
  CollectionWithProducts,
  Product,
  PublicProduct,
} from "../types";
import { products as mockProducts } from "./mock/products";
import { collections as mockCollections } from "./mock/collections";

/**
 * Adaptador de datos. Es el ÚNICO punto que conoce el origen de los datos.
 * Para conectar la API real basta con reemplazar el cuerpo de estas funciones por fetch()
 * manteniendo las firmas (ver docs/arquitectura-futura.md).
 */

/** Regla pública de precio: si no se muestra, el valor no sale del adaptador. */
export function toPublicProduct(p: Product): PublicProduct {
  return { ...p, price: p.showPrice ? p.price : null };
}

const delay = <T,>(value: T) => Promise.resolve(value);

export async function getCollections(): Promise<Collection[]> {
  return delay(mockCollections);
}

export async function getCollection(id: string): Promise<CollectionWithProducts | null> {
  const collection = mockCollections.find((c) => c.id === id);
  if (!collection) return null;
  const ids = new Set<string>();
  for (const page of collection.pages) {
    if ("productId" in page) ids.add(page.productId);
    if (page.template === "duo")
      page.slots.forEach((s) => s.type === "product" && ids.add(s.productId));
  }
  const products: Record<string, PublicProduct> = {};
  for (const p of mockProducts) if (ids.has(p.id)) products[p.id] = toPublicProduct(p);
  return delay({ collection, products });
}

export async function getProducts(): Promise<PublicProduct[]> {
  return delay(mockProducts.map(toPublicProduct));
}
