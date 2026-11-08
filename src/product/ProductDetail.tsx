import { useEffect, useRef, useState } from "react";
import type { PublicProduct } from "../types";
import { Img, Price } from "../components/shared";

/**
 * Detalle de producto en <dialog> nativo:
 * - escritorio: panel lateral; móvil: hoja inferior.
 * - foco atrapado, Esc para cerrar y retorno del foco al botón de origen (nativo).
 * - la revista queda detrás, en la misma página.
 */
export function ProductDetail({
  product,
  onClose,
}: {
  product: PublicProduct | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<PublicProduct | null>(product);

  useEffect(() => {
    if (product) {
      setShown(product);
      setActive(0);
    }
    const d = ref.current;
    if (!d) return;
    if (product && !d.open) {
      d.showModal();
      d.querySelector<HTMLButtonElement>(".detail__close")?.focus();
    }
    if (!product && d.open) d.close();
  }, [product]);

  const p = product ?? shown;

  return (
    <dialog
      ref={ref}
      className="detail"
      aria-labelledby="detail-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {p && (
        <div className="detail__body">
          <button
            type="button"
            className="detail__close"
            onClick={onClose}
            aria-label="Cerrar detalle"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="detail__gallery">
            <div className="detail__main">
              <Img id={p.images[active]} eager key={p.images[active]} />
            </div>
            {p.images.length > 1 && (
              <ul className="detail__thumbs" aria-label="Fotografías">
                {p.images.map((img, i) => (
                  <li key={img}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={i === active}
                      aria-label={`Ver fotografía ${i + 1} de ${p.images.length}`}
                    >
                      <Img id={img} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="detail__info">
            {p.technique && <p className="kicker">{p.technique}</p>}
            <h2 id="detail-title" className="detail__name">
              {p.name}
            </h2>
            <Price product={p} className="detail__price" />
            <p className="detail__desc">{p.description}</p>
            {p.features.length > 0 && (
              <>
                <h3 className="detail__sub">Lo que se aprecia en la pieza</h3>
                <ul className="detail__features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="detail__note">
              Medidas y materiales por confirmar. Información provisional del prototipo.
            </p>
            <button type="button" className="detail__back" onClick={onClose}>
              Volver a la revista
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
