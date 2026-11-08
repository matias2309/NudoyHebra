import { Link } from "react-router-dom";
import { getCollections, getProducts } from "../../data/catalogApi";
import { useAsync, useDocumentTitle } from "../../lib/hooks";
import { Img, Price } from "../../components/shared";
import { CoverPreview } from "../../magazine/templates/Pages";
import { BRAND } from "../../variants";

/** Propuesta A — Editorial artesanal: revista cálida de taller. */
export function HomeA() {
  useDocumentTitle(`${BRAND.name} · Propuesta A`);
  const collections = useAsync(getCollections, []);
  const products = useAsync(getProducts, []);

  return (
    <div className="home-a">
      <section className="a-hero">
        <div className="a-hero__text">
          <p className="eyebrow">Edición 01 · Temporada navideña</p>
          <h1 className="a-hero__title">
            Hecho a mano,
            <br />
            <em>nudo a nudo</em>
          </h1>
          <p className="a-hero__lead">
            Decoración textil y piezas de macramé para vestir el hogar. Hojea el catálogo como una
            revista y descubre cada detalle.
          </p>
          <div className="a-hero__actions">
            <Link to="revista/navidad-tejida" className="btn">
              Abrir la revista
            </Link>
            <Link to="colecciones" className="link-arrow">
              Ver colecciones
            </Link>
          </div>
        </div>
        <figure className="a-hero__main">
          <Img id="rosa-completo" eager />
        </figure>
        <figure className="a-hero__inset">
          <Img id="verde-estrella" eager />
          <figcaption className="caption">Estrella calada de madera natural</figcaption>
        </figure>
      </section>

      <section className="a-intro">
        <p className="a-intro__text">
          <span className="dropcap">E</span>ste catálogo reúne piezas tejidas a mano: árboles de
          macramé, cuentas de madera y flecos que caen con calma. Cada colección se presenta como
          una edición impresa, para mirarla sin apuro y elegir con calma la pieza que acompañará
          tu casa.
        </p>
      </section>

      <section className="a-collections" aria-labelledby="a-coll-title">
        <header className="a-section-head">
          <p className="eyebrow">Las ediciones</p>
          <h2 id="a-coll-title" className="a-h2">
            Colecciones para hojear
          </h2>
        </header>
        <ul className="a-covers">
          {collections?.map((c) => (
            <li key={c.id} className="a-covers__item">
              <Link to={`revista/${c.id}`} className="a-covers__link">
                <CoverPreview collection={c} />
                <span className="a-covers__title">{c.title}</span>
                <span className="a-covers__sub">{c.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="demo-note a-center">Ediciones demostrativas, nombres por confirmar.</p>
      </section>

      <section className="a-selection" aria-labelledby="a-sel-title">
        <header className="a-section-head">
          <p className="eyebrow">Selección del taller</p>
          <h2 id="a-sel-title" className="a-h2">
            Dos tonos, un mismo árbol
          </h2>
        </header>
        <div className="a-selection__grid">
          {products?.map((p, i) => (
            <article key={p.id} className={`a-product a-product--${i + 1}`}>
              <figure className="a-product__fig">
                <Img id={p.images[0]} alt="" />
              </figure>
              <div className="a-product__text">
                <h3 className="a-product__name">
                  <Link to={`revista/navidad-tejida?p=6&producto=${p.id}`} className="stretch">
                    {p.name}
                  </Link>
                </h3>
                <p className="a-product__desc">{p.description}</p>
                <Price product={p} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="a-craft">
        <figure className="a-craft__fig">
          <Img id="verde-cuentas" />
        </figure>
        <div className="a-craft__card">
          <p className="eyebrow">El oficio</p>
          <h2 className="a-h2">Paciencia, cordón y madera</h2>
          <p>
            Las piezas se arman nudo a nudo. La madera natural y las cuentas en tono miel aportan la
            calidez; el cordón grueso, la textura.
          </p>
          <Link to="trabajo" className="link-arrow">
            Conocer nuestro trabajo
          </Link>
        </div>
      </section>

      <section className="a-contact">
        <h2 className="a-h2">¿Conversamos sobre tu pieza?</h2>
        <p>Colores, encargos y disponibilidad: te respondemos personalmente.</p>
        <Link to="contacto" className="btn">
          Contacto
        </Link>
      </section>
    </div>
  );
}
