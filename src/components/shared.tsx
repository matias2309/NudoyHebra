import { createContext, useContext, type CSSProperties } from "react";
import { media, mediaUrl } from "../data/media";
import type { PublicProduct, VariantId } from "../types";

/* ---------- Variante activa ---------- */
export const VariantContext = createContext<VariantId>("a");
export const useVariant = () => useContext(VariantContext);

/* ---------- Imagen real ---------- */
type ImgProps = {
  id: string;
  className?: string;
  eager?: boolean;
  alt?: string;
  position?: string;
  style?: CSSProperties;
};

export function Img({ id, className, eager, alt, position, style }: ImgProps) {
  const m = media[id];
  if (!m) return null;
  return (
    <img
      src={mediaUrl(m)}
      alt={alt ?? m.alt}
      width={m.width}
      height={m.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={{ objectPosition: position ?? m.position, ...style }}
    />
  );
}

/* ---------- Precio ---------- */
const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export const formatCLP = (n: number) => clp.format(n);

/**
 * Muestra el precio solo si showPrice es true y existe un valor.
 * En cualquier otro caso devuelve null: sin "$0", sin placeholder y sin espacio vacío.
 */
export function Price({ product, className }: { product: PublicProduct; className?: string }) {
  if (!product.showPrice || product.price == null) return null;
  return (
    <p className={`price ${className ?? ""}`}>
      <span className="price__value">{formatCLP(product.price)}</span>
      <span className="price__demo">valor demo</span>
    </p>
  );
}

/* ---------- Sellos («Hecho a mano», «Con luz LED») ---------- */
export function Badges({ product, className }: { product: PublicProduct; className?: string }) {
  if (!product.badges?.length) return null;
  return (
    <ul className={`badges ${className ?? ""}`} aria-label="Características destacadas">
      {product.badges.map((b) => (
        <li key={b} className="badge">
          {b}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Espacio reservado para fotos futuras ---------- */
export function PhotoPending({ label = "Pieza por fotografiar" }: { label?: string }) {
  return (
    <div className="pending" role="img" aria-label={`${label}: espacio reservado, fotografía pendiente`}>
      <span className="pending__label">{label}</span>
      <span className="pending__hint">Fotografía pendiente</span>
    </div>
  );
}

/* ---------- Números romanos (propuesta B) ---------- */
export function roman(n: number): string {
  const map: [number, string][] = [
    [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let out = "";
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
