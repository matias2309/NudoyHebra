import { Link } from "react-router-dom";
import { Img } from "../components/shared";
import { useDocumentTitle } from "../lib/hooks";
import { BRAND, VARIANTS, VARIANT_IDS } from "../variants";

const PREVIEW: Record<string, { img: string; swatches: string[]; font: string }> = {
  a: { img: "rosa-completo", swatches: ["#f4ede1", "#b8674a", "#d9a5a0", "#6f7a48", "#3b2f27"], font: "'Fraunces', serif" },
  b: { img: "verde-completo", swatches: ["#f8f5ee", "#e8dfcf", "#5a4436", "#6b1f2a", "#b39256"], font: "'Cormorant Garamond', serif" },
  c: { img: "verde-copa", swatches: ["#f6f3ec", "#1f4a3a", "#c8613f", "#e8a39a", "#d9a93a"], font: "'Bricolage Grotesque', sans-serif" },
};

/** Portada del prototipo: presenta las tres propuestas para la clienta. */
export function Comparator() {
  useDocumentTitle("Tres propuestas · Prototipo de catálogo");
  return (
    <main className="cmp" id="main">
      <header className="cmp__head">
        <p className="cmp__eyebrow">Prototipo de diseño · {BRAND.name} ({BRAND.note.toLowerCase()})</p>
        <h1 className="cmp__title">Tres propuestas para tu catálogo digital</h1>
        <p className="cmp__lead">
          Las tres usan tus fotografías reales y el mismo contenido de prueba. Recorre cada una: el
          inicio, las colecciones y la revista que se hojea. Desde cualquier pantalla puedes cambiar
          de propuesta con la barra superior sin perder la página en la que estás.
        </p>
      </header>

      <ol className="cmp__grid">
        {VARIANT_IDS.map((id) => {
          const v = VARIANTS[id];
          const pv = PREVIEW[id];
          return (
            <li key={id} className="cmp-card" data-v={id}>
              <figure className="cmp-card__fig">
                <Img id={pv.img} alt="" />
                <span className="cmp-card__letter" style={{ fontFamily: pv.font }}>
                  {v.letter}
                </span>
              </figure>
              <div className="cmp-card__body">
                <h2 className="cmp-card__name" style={{ fontFamily: pv.font }}>
                  {v.name}
                </h2>
                <p className="cmp-card__mood">{v.mood}</p>
                <ul className="cmp-card__swatches" aria-label="Paleta de colores">
                  {pv.swatches.map((s) => (
                    <li key={s} style={{ background: s }} title={s} />
                  ))}
                </ul>
                <p className="cmp-card__text">{v.transmits}</p>
                <ul className="cmp-card__adv">
                  {v.advantages.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <div className="cmp-card__actions">
                  <Link to={`/${id}`} className="cmp-btn">
                    Recorrer propuesta {v.letter}
                  </Link>
                  <Link to={`/${id}/revista/navidad-tejida`} className="cmp-link">
                    Ir directo a la revista
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="cmp__foot">
        <p>
          Contenido demostrativo: nombres, textos, colecciones y precios son provisionales. Uno de los
          productos muestra su precio y el otro lo tiene oculto, para que veas ambos casos.
        </p>
      </footer>
    </main>
  );
}
