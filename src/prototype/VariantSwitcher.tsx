import { Link, useLocation } from "react-router-dom";
import { VARIANTS, VARIANT_IDS } from "../variants";
import type { VariantId } from "../types";

/**
 * Selector exclusivo del prototipo: cambia de propuesta conservando la sección,
 * la revista abierta y la página actual.
 */
export function VariantSwitcher({ current }: { current: VariantId }) {
  const { pathname, search } = useLocation();
  const rest = pathname.replace(/^\/[abc]/, "");

  return (
    <div className="proto-bar" role="region" aria-label="Selector de propuestas del prototipo">
      <Link to="/" className="proto-bar__home">
        Prototipo · <span>comparar</span>
      </Link>
      <ul className="proto-bar__list">
        {VARIANT_IDS.map((id) => (
          <li key={id}>
            <Link
              to={`/${id}${rest}${search}`}
              className="proto-bar__opt"
              aria-current={id === current ? "true" : undefined}
              title={VARIANTS[id].name}
            >
              <b>{VARIANTS[id].letter}</b>
              <span className="proto-bar__name">{VARIANTS[id].name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
