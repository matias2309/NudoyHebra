import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCollections, getProduct } from "../data/catalogApi";
import { useAsync, useDocumentTitle } from "../lib/hooks";
import { Img, Price, pad2, roman, useVariant } from "../components/shared";
import { CoverPreview } from "../magazine/templates/Pages";
import { BRAND, inquiryMessage } from "../variants";

/* ================= Colecciones ================= */
export function CollectionsPage() {
  const v = useVariant();
  const list = useAsync(getCollections, []);
  useDocumentTitle(`Colecciones · ${BRAND.name}`);

  return (
    <section className="collections">
      <header className="section-head">
        <p className="eyebrow">Catálogo</p>
        <h1 className="section-title">Colecciones</h1>
        <p className="section-lead">
          Cada colección es una revista con portada propia. Ábrela y hojéala página a página.
        </p>
        <p className="demo-note">Ediciones demostrativas: nombres y contenidos por confirmar.</p>
      </header>
      <ol className="collections__list">
        {list?.map((c, i) => (
          <li key={c.id} className="coll">
            <Link to={`/${v}/revista/${c.id}`} className="coll__cover" tabIndex={-1} aria-hidden="true">
              <CoverPreview collection={c} />
            </Link>
            <div className="coll__text">
              <p className="coll__num">{v === "b" ? roman(i + 1) : pad2(i + 1)}</p>
              <h2 className="coll__title">
                <Link to={`/${v}/revista/${c.id}`}>{c.title}</Link>
              </h2>
              <p className="coll__sub">
                {c.issue} · {c.subtitle}
              </p>
              <p className="coll__desc">{c.description}</p>
              <Link to={`/${v}/revista/${c.id}`} className="btn" aria-label={`Abrir revista ${c.title}`}>
                Abrir revista
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ================= Nuestro trabajo ================= */
const WORK = [
  {
    kicker: "Tiempo",
    title: "Piezas que se hacen sin apuro",
    text: "El trabajo artesanal se mide en horas de dedicación. Cada nudo se ajusta a mano para que la forma final sea pareja y firme.",
    image: "verde-copa",
  },
  {
    kicker: "Materiales",
    title: "Cordón, madera y cuentas",
    text: "Materiales nobles y simples: cordón textil grueso, madera natural y cuentas en tonos cálidos que se combinan en cada diseño.",
    image: "verde-cuentas",
  },
  {
    kicker: "Detalle",
    title: "Las terminaciones importan",
    text: "Una estrella bien puesta, flecos parejos, una guirnalda que cae justo al centro. Los detalles hacen que una pieza se sienta especial.",
    image: "verde-estrella",
  },
];

export function WorkPage() {
  useDocumentTitle(`Nuestro trabajo · ${BRAND.name}`);
  const v = useVariant();
  return (
    <section className="work">
      <header className="section-head">
        <p className="eyebrow">Nuestro trabajo</p>
        <h1 className="section-title">Hecho a mano, con dedicación</h1>
        <p className="section-lead">
          Detrás de cada pieza hay un proceso paciente. Esta sección mostrará el oficio del taller.
        </p>
        <p className="demo-note">Textos provisionales: la historia de la marca se incorporará cuando sea confirmada.</p>
      </header>
      <div className="work__list">
        {WORK.map((w, i) => (
          <article key={w.kicker} className="work__item">
            <figure className="work__fig">
              <Img id={w.image} />
            </figure>
            <div className="work__text">
              <p className="work__num">{v === "b" ? roman(i + 1) : pad2(i + 1)}</p>
              <p className="eyebrow">{w.kicker}</p>
              <h2 className="work__title">{w.title}</h2>
              <p>{w.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ================= Contacto ================= */

/** Si se llega desde «Consultar esta pieza» (?pieza=id), muestra la pieza y un mensaje listo para copiar. */
function InquiryCard() {
  const v = useVariant();
  const [params] = useSearchParams();
  const id = params.get("pieza");
  const product = useAsync(() => (id ? getProduct(id) : Promise.resolve(null)), [id]);
  const [copied, setCopied] = useState<"ok" | "error" | null>(null);
  if (!product) return null;

  const message = inquiryMessage(product.name);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("ok");
    } catch {
      setCopied("error");
    }
  };

  return (
    <div className="contact__card inquiry">
      <figure className="inquiry__fig">
        <Img id={product.images[0]} alt="" />
      </figure>
      <div className="inquiry__text">
        <h2 className="contact__label">Consulta sobre</h2>
        <p className="inquiry__name">{product.name}</p>
        <Price product={product} />
        <p className="inquiry__msg">{message}</p>
        <div className="inquiry__actions">
          <button type="button" className="btn" onClick={copy}>
            Copiar mensaje
          </button>
          <Link to={`/${v}/revista/navidad-tejida?producto=${product.id}`} className="link-arrow">
            Volver a la pieza
          </Link>
        </div>
        <p className="demo-note" role="status">
          {copied === "ok"
            ? "Mensaje copiado. Pégalo en el canal que prefieras."
            : copied === "error"
              ? "No se pudo copiar automáticamente; selecciona el texto y cópialo."
              : ""}
        </p>
      </div>
    </div>
  );
}

export function ContactPage() {
  useDocumentTitle(`Contacto · ${BRAND.name}`);
  return (
    <section className="contact">
      <header className="section-head">
        <p className="eyebrow">Contacto</p>
        <h1 className="section-title">Conversemos</h1>
        <p className="section-lead">
          ¿Te interesa una pieza, un color distinto o un encargo? Escríbenos y te responderemos personalmente.
        </p>
      </header>
      <div className="contact__grid">
        <InquiryCard />
        <div className="contact__card contact__card--main">
          <h2 className="contact__label">WhatsApp</h2>
          <p className="contact__value">+56 9 XXXX XXXX</p>
          <span className="btn btn--disabled" aria-disabled="true">
            Escribir por WhatsApp
          </span>
          <p className="demo-note">Canal demostrativo: el número real se configurará más adelante.</p>
        </div>
        <dl className="contact__list">
          <div>
            <dt>Instagram</dt>
            <dd>Por definir</dd>
          </div>
          <div>
            <dt>Correo</dt>
            <dd>Por definir</dd>
          </div>
          <div>
            <dt>Horario de atención</dt>
            <dd>Por confirmar</dd>
          </div>
          <div>
            <dt>Retiro y envíos</dt>
            <dd>Por confirmar</dd>
          </div>
        </dl>
      </div>
      <figure className="contact__fig">
        <Img id="rosa-completo" />
      </figure>
    </section>
  );
}
