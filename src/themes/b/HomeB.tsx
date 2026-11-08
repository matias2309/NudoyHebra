import { Link } from "react-router-dom";
import { getCollections, getProducts } from "../../data/catalogApi";
import { useAsync, useDocumentTitle } from "../../lib/hooks";
import { Img, Price, roman } from "../../components/shared";
import { BRAND } from "../../variants";

/** Propuesta B — Boutique de autor: espacio, calma y una pieza a la vez. */
export function HomeB() {
  useDocumentTitle(`${BRAND.name} · Propuesta B`);
  const collections = useAsync(getCollections, []);
  const products = useAsync(getProducts, []);

  return (
    <div className="home-b">
      <section className="b-hero">
        <p className="eyebrow">Colección navideña</p>
        <figure className="b-hero__fig">
          <Img id="verde-completo" eager />
        </figure>
        <h1 className="b-hero__title">
          El arte <em>del nudo</em>
        </h1>
        <p className="b-hero__lead">Piezas textiles hechas a mano, una a una.</p>
        <Link to="revista/navidad-tejida" className="link-quiet">
          Descubrir la edición
        </Link>
      </section>

      <section className="b-statement">
        <span className="rule" aria-hidden="true" />
        <p>
          Un catálogo pensado como una publicación de autor: pocas piezas, bien presentadas, para
          apreciar su textura y sus terminaciones.
        </p>
        <span className="rule" aria-hidden="true" />
      </section>

      <section className="b-collections" aria-labelledby="b-coll-title">
        <h2 id="b-coll-title" className="b-h2">
          Ediciones
        </h2>
        <ol className="b-index">
          {collections?.map((c, i) => (
            <li key={c.id} className="b-index__row">
              <span className="b-index__num">{roman(i + 1)}</span>
              <div className="b-index__text">
                <h3 className="b-index__title">
                  <Link to={`revista/${c.id}`} className="stretch">
                    {c.title}
                  </Link>
                </h3>
                <p className="b-index__sub">{c.subtitle}</p>
              </div>
              <figure className="b-index__cover">
                <Img id={c.coverImage} alt="" />
              </figure>
            </li>
          ))}
        </ol>
        <p className="demo-note">Ediciones demostrativas, nombres por confirmar.</p>
      </section>

      <section className="b-pieces" aria-labelledby="b-pieces-title">
        <h2 id="b-pieces-title" className="b-h2">
          Piezas
        </h2>
        {products?.map((p, i) => (
          <article key={p.id} className={`b-piece ${i % 2 ? "b-piece--rev" : ""}`}>
            <figure className="b-piece__fig">
              <Img id={p.images[0]} alt="" />
            </figure>
            <div className="b-piece__text">
              <p className="b-piece__num">{roman(i + 1)}</p>
              <h3 className="b-piece__name">{p.name}</h3>
              <p className="b-piece__desc">{p.description}</p>
              <Price product={p} />
              <Link to={`revista/navidad-tejida?p=6&producto=${p.id}`} className="link-quiet">
                Ver en la revista
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="b-craft">
        <figure className="b-craft__fig">
          <Img id="verde-copa" />
        </figure>
        <blockquote className="b-craft__quote">
          <p>Cada nudo es una pequeña decisión.</p>
        </blockquote>
        <p className="b-craft__text">
          Cordón, madera natural y cuentas en tono miel. Materiales simples, trabajados con
          paciencia.
        </p>
        <Link to="trabajo" className="link-quiet">
          Nuestro trabajo
        </Link>
      </section>

      <section className="b-contact">
        <p className="eyebrow">Atención personalizada</p>
        <h2 className="b-h2">Consultas y encargos</h2>
        <Link to="contacto" className="btn">
          Contactar
        </Link>
      </section>
    </div>
  );
}
