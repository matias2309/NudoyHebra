import { Link } from "react-router-dom";
import { getCollections, getProducts } from "../../data/catalogApi";
import { useAsync, useDocumentTitle } from "../../lib/hooks";
import { Img, Price, pad2 } from "../../components/shared";
import { CoverPreview } from "../../magazine/templates/Pages";
import { BRAND } from "../../variants";

/** Propuesta C — Artesanía contemporánea: asimetría, ritmo y móvil primero. */
export function HomeC() {
  useDocumentTitle(`${BRAND.name} · Propuesta C`);
  const collections = useAsync(getCollections, []);
  const products = useAsync(getProducts, []);

  return (
    <div className="home-c">
      <section className="c-hero">
        <h1 className="c-hero__title">
          Nudos con <span className="c-hl">luz</span> propia
        </h1>
        <p className="c-hero__lead">
          Macramé y decoración textil hecha a mano. Un catálogo para hojear como revista.
        </p>
        <div className="c-hero__actions">
          <Link to="revista/navidad-tejida" className="btn">
            Abrir revista
          </Link>
          <Link to="colecciones" className="btn btn--ghost">
            Colecciones
          </Link>
        </div>
        <figure className="c-hero__a">
          <Img id="verde-completo" eager />
        </figure>
        <figure className="c-hero__b">
          <Img id="rosa-completo" eager />
        </figure>
        <figure className="c-hero__c">
          <Img id="verde-copa" eager />
        </figure>
        <p className="c-sticker" aria-hidden="true">
          Nueva
          <br />
          edición
        </p>
      </section>

      <p className="c-band" aria-label="Macramé, madera natural, hecho a mano">
        <span>Macramé</span>
        <span aria-hidden="true">✳</span>
        <span>Madera natural</span>
        <span aria-hidden="true">✳</span>
        <span>Hecho a mano</span>
      </p>

      <section className="c-collections" aria-labelledby="c-coll-title">
        <header className="c-head">
          <h2 id="c-coll-title" className="c-h2">
            Colecciones
          </h2>
          <Link to="colecciones" className="link-arrow">
            Ver todas
          </Link>
        </header>
        <ul className="c-rail">
          {collections?.map((c, i) => (
            <li key={c.id} className="c-rail__item">
              <Link to={`revista/${c.id}`} className="c-rail__link">
                <CoverPreview collection={c} />
                <span className="c-rail__num">{pad2(i + 1)}</span>
                <span className="c-rail__title">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="demo-note">Ediciones demostrativas, nombres por confirmar.</p>
      </section>

      <section className="c-picks" aria-labelledby="c-picks-title">
        <h2 id="c-picks-title" className="c-h2">
          Selección
        </h2>
        <div className="c-picks__grid">
          {products?.map((p, i) => (
            <article key={p.id} className={`c-pick c-pick--${i + 1}`}>
              <figure className="c-pick__fig">
                <Img id={p.images[0]} alt="" />
              </figure>
              <div className="c-pick__text">
                <h3 className="c-pick__name">
                  <Link to={`revista/navidad-tejida?p=6&producto=${p.id}`} className="stretch">
                    {p.name}
                  </Link>
                </h3>
                <Price product={p} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="c-craft" aria-labelledby="c-craft-title">
        <h2 id="c-craft-title" className="c-h2">
          Cómo nace una pieza
        </h2>
        <ol className="c-steps">
          {[
            ["Diseño", "Se elige la forma, el color del cordón y la madera.", "verde-estrella"],
            ["Anudado", "Nudo a nudo, a mano, hasta formar cada hoja.", "verde-copa"],
            ["Terminaciones", "Cuentas, flecos y los últimos ajustes.", "verde-cuentas"],
          ].map(([t, d, img], i) => (
            <li key={t} className="c-step">
              <Img id={img} />
              <span className="c-step__num">{pad2(i + 1)}</span>
              <h3 className="c-step__title">{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <p className="demo-note">Proceso descrito de forma general y provisional.</p>
        <Link to="trabajo" className="link-arrow">
          Nuestro trabajo
        </Link>
      </section>

      <section className="c-contact">
        <h2 className="c-contact__title">Hablemos</h2>
        <p>Encargos, colores y disponibilidad.</p>
        <Link to="contacto" className="btn btn--light">
          Ir a contacto
        </Link>
      </section>
    </div>
  );
}
