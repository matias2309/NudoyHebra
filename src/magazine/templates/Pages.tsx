import { Link } from "react-router-dom";
import type { Collection, MagazinePage, PublicProduct, Slot } from "../../types";
import { Img, PhotoPending, Price, pad2, roman, useVariant } from "../../components/shared";
import { BRAND } from "../../variants";

/**
 * Plantillas editoriales compartidas por las tres propuestas.
 * El marcado es común; cada propuesta compone la página con su propio CSS
 * (rejillas, tipografía, ornamentos) en src/styles/theme-*.css.
 */

export type PageCtx = {
  collection: Collection;
  products: Record<string, PublicProduct>;
  onSelect: (productId: string) => void;
  total: number;
};

type Side = "left" | "right" | "single";

const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

function Folio({ n, ctx }: { n: number; ctx: PageCtx }) {
  const v = useVariant();
  const num = v === "b" ? roman(n) : pad2(n);
  return (
    <footer className="folio" aria-hidden="true">
      <span className="folio__num">{num}</span>
      <span className="folio__title">{ctx.collection.title}</span>
    </footer>
  );
}

function ProductSlot({ slot, ctx, i }: { slot: Slot; ctx: PageCtx; i: number }) {
  if (slot.type === "placeholder")
    return (
      <div className={`slot slot--${i} slot--pending`}>
        <PhotoPending label={slot.label} />
      </div>
    );
  const p = ctx.products[slot.productId];
  if (!p) return null;
  return (
    <figure className={`slot slot--${i}`}>
      <div className="slot__media">
        <Img id={p.images[0]} alt="" />
      </div>
      <figcaption className="slot__text">
        <h3 className="slot__name">
          <button type="button" className="stretch" onClick={() => ctx.onSelect(p.id)}>
            {p.name}
          </button>
        </h3>
        <p className="slot__desc">{firstSentence(p.description)}</p>
        <Price product={p} />
      </figcaption>
    </figure>
  );
}

function Cover({ ctx }: { ctx: PageCtx }) {
  const c = ctx.collection;
  return (
    <div className="cover">
      <div className="cover__media">
        <Img id={c.coverImage} eager />
      </div>
      <header className="cover__mast">
        <span className="cover__brand">{BRAND.name}</span>
        <span className="cover__issue">
          {c.issue} · {c.season}
        </span>
      </header>
      <div className="cover__titles">
        <p className="cover__kicker">Catálogo</p>
        <h2 className="cover__title">{c.title}</h2>
        <p className="cover__subtitle">{c.subtitle}</p>
      </div>
      {c.demo && <span className="cover__badge">Edición demostrativa</span>}
    </div>
  );
}

function Back({ ctx }: { ctx: PageCtx }) {
  const v = useVariant();
  return (
    <div className="back">
      <p className="back__kicker">Fin de la edición</p>
      <p className="back__brand">{BRAND.name}</p>
      <p className="back__text">
        ¿Te gustó alguna pieza? Escríbenos y conversemos sobre colores, encargos y disponibilidad.
      </p>
      <Link className="back__cta" to={`/${v}/contacto`}>
        Ir a contacto
      </Link>
      <p className="back__note">
        {ctx.collection.issue} · {BRAND.note}
      </p>
    </div>
  );
}

export function PageView({
  page,
  index,
  side,
  ctx,
}: {
  page: MagazinePage;
  index: number;
  side: Side;
  ctx: PageCtx;
}) {
  const numbered = page.template !== "cover" && page.template !== "back";
  let body: React.ReactNode = null;

  switch (page.template) {
    case "cover":
      body = <Cover ctx={ctx} />;
      break;
    case "back":
      body = <Back ctx={ctx} />;
      break;
    case "editorial":
      body = (
        <div className="ed">
          {page.image && (
            <figure className="ed__fig">
              <Img id={page.image} />
              {page.caption && <figcaption className="caption">{page.caption}</figcaption>}
            </figure>
          )}
          <div className="ed__text">
            <p className="kicker">{page.kicker}</p>
            <h2 className="pg-title">{page.title}</h2>
            {page.body.map((t, i) => (
              <p key={i} className={i === 0 ? "ed__p ed__p--lead" : "ed__p"}>
                {t}
              </p>
            ))}
          </div>
        </div>
      );
      break;
    case "feature": {
      const p = ctx.products[page.productId];
      if (!p) break;
      body = (
        <figure className="ft">
          <div className="ft__media">
            <Img id={p.images[0]} alt="" />
          </div>
          <figcaption className="ft__text">
            {page.kicker && <p className="kicker">{page.kicker}</p>}
            <h2 className="pg-title ft__headline">{page.headline}</h2>
            <h3 className="ft__name">
              <button type="button" className="stretch" onClick={() => ctx.onSelect(p.id)}>
                {p.name}
              </button>
            </h3>
            <p className="ft__desc">{firstSentence(p.description)}</p>
            <Price product={p} />
            <span className="ft__more" aria-hidden="true">
              Ver detalle
            </span>
          </figcaption>
        </figure>
      );
      break;
    }
    case "duo":
      body = (
        <div className="duo">
          {(page.kicker || page.title) && (
            <header className="duo__head">
              {page.kicker && <p className="kicker">{page.kicker}</p>}
              {page.title && <h2 className="pg-title">{page.title}</h2>}
            </header>
          )}
          <ProductSlot slot={page.slots[0]} ctx={ctx} i={1} />
          <ProductSlot slot={page.slots[1]} ctx={ctx} i={2} />
        </div>
      );
      break;
    case "details": {
      const p = ctx.products[page.productId];
      body = (
        <div className="dt">
          <header className="dt__head">
            {page.kicker && <p className="kicker">{page.kicker}</p>}
            <h2 className="pg-title">{page.title}</h2>
          </header>
          {page.items.map((it, i) => (
            <figure key={i} className={`dt__fig dt__fig--${i + 1}`}>
              <Img id={it.image} />
              <figcaption className="caption">{it.caption}</figcaption>
            </figure>
          ))}
          {p && (
            <p className="dt__link">
              <button type="button" onClick={() => ctx.onSelect(p.id)}>
                Ver pieza: {p.name}
              </button>
            </p>
          )}
        </div>
      );
      break;
    }
  }

  return (
    <article
      className={`pg pg--${page.template}`}
      data-side={side}
      aria-label={numbered ? `Página ${index}` : page.template === "cover" ? "Portada" : "Contraportada"}
    >
      <div className="pg__inner">{body}</div>
      {numbered && <Folio n={index} ctx={ctx} />}
    </article>
  );
}

/** Portada aislada para listados de colecciones (misma composición que en la revista). */
export function CoverPreview({ collection }: { collection: Collection }) {
  return (
    <div className="pg pg--cover pg--preview" aria-hidden="true">
      <div className="pg__inner">
        <Cover ctx={{ collection, products: {}, onSelect: () => {}, total: 0 }} />
      </div>
    </div>
  );
}
