import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { PublicProduct } from "../types";
import { Badges, Img, Price, useVariant } from "../components/shared";
import { CONTACT, inquiryMessage } from "../variants";

/**
 * Detalle de producto en <dialog> nativo:
 * - escritorio: panel lateral; móvil: hoja inferior.
 * - foco atrapado, Esc para cerrar y retorno del foco al botón de origen (nativo).
 * - la revista queda detrás, en la misma página.
 * - la foto principal se amplía a pantalla completa en un segundo <dialog> (lightbox).
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
  const [zoom, setZoom] = useState(false);
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
    if (!product && d.open) {
      setZoom(false);
      d.close();
    }
  }, [product]);

  const p = product ?? shown;

  return (
    <dialog
      ref={ref}
      className="detail"
      aria-labelledby="detail-title"
      onClose={(e) => {
        // el cierre del lightbox anidado también llega aquí por el árbol de React
        if (e.target === e.currentTarget) onClose();
      }}
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
            <button
              type="button"
              className="detail__main"
              onClick={() => setZoom(true)}
              aria-label="Ampliar fotografía a pantalla completa"
            >
              <Img id={p.images[active]} eager key={p.images[active]} />
              <span className="detail__zoom-hint" aria-hidden="true">
                Ampliar
              </span>
            </button>
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
            <Badges product={p} className="detail__badges" />
            <Price product={p} className="detail__price" />
            <InquiryButton product={p} />
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
          <Lightbox
            open={zoom}
            images={p.images}
            index={active}
            onIndex={setActive}
            onClose={() => setZoom(false)}
          />
        </div>
      )}
    </dialog>
  );
}

/** Llamado a la acción principal: WhatsApp con mensaje listo o, mientras no exista, Contacto. */
function InquiryButton({ product }: { product: PublicProduct }) {
  const v = useVariant();
  if (CONTACT.whatsapp) {
    const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(inquiryMessage(product.name))}`;
    return (
      <a className="btn detail__cta" href={href} target="_blank" rel="noopener noreferrer">
        Consultar esta pieza
      </a>
    );
  }
  return (
    <Link className="btn detail__cta" to={`/${v}/contacto?pieza=${encodeURIComponent(product.id)}`}>
      Consultar esta pieza
    </Link>
  );
}

/** Foto a pantalla completa: Esc o clic en el fondo cierra; ←/→ recorren las fotos. */
function Lightbox({
  open,
  images,
  index,
  onIndex,
  onClose,
}: {
  open: boolean;
  images: string[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const many = images.length > 1;
  const go = (d: number) => onIndex((index + d + images.length) % images.length);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`Fotografía ${index + 1} de ${images.length}, ampliada`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as Element).classList.contains("lightbox__stage"))
          onClose();
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
    >
      {open && (
        <>
          <div className="lightbox__stage">
            <Img id={images[index]} eager key={images[index]} />
          </div>
          <button type="button" className="lightbox__close" onClick={onClose} aria-label="Cerrar foto ampliada">
            <span aria-hidden="true">×</span>
          </button>
          {many && (
            <>
              <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Foto anterior">
                <span aria-hidden="true">‹</span>
              </button>
              <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Foto siguiente">
                <span aria-hidden="true">›</span>
              </button>
              <p className="lightbox__count" aria-hidden="true">
                {index + 1} / {images.length}
              </p>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
