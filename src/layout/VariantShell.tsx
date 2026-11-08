import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { VariantContext } from "../components/shared";
import { BRAND, VARIANTS, isVariant } from "../variants";
import type { VariantId } from "../types";
import { VariantSwitcher } from "../prototype/VariantSwitcher";

const NAV = [
  { to: "", label: "Inicio", short: "Inicio", end: true },
  { to: "colecciones", label: "Colecciones", short: "Ediciones" },
  { to: "trabajo", label: "Nuestro trabajo", short: "Taller" },
  { to: "contacto", label: "Contacto", short: "Contacto" },
];

function NavItems({ v, onNavigate }: { v: VariantId; onNavigate?: () => void }) {
  return (
    <ul className="nav__list">
      {NAV.map((n) => (
        <li key={n.to}>
          <NavLink to={`/${v}/${n.to}`} end={n.end} className="nav__link" onClick={onNavigate}>
            {n.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function Header({ v }: { v: VariantId }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const brand = (
    <Link to={`/${v}`} className="brand" aria-label={`${BRAND.name}, inicio`}>
      {v === "c" && <span className="brand__dot" aria-hidden="true" />}
      <span className="brand__name">{BRAND.name}</span>
    </Link>
  );

  return (
    <header className="site-header" data-open={open || undefined}>
      {v === "a" && <p className="site-header__eyebrow">Catálogo artesanal · Hecho a mano</p>}
      <div className="site-header__row">
        {brand}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
        <nav id="main-nav" className="nav" aria-label="Principal">
          <NavItems v={v} onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </header>
  );
}

/** Barra de pestañas inferior (solo propuesta C, en móvil). */
function TabBar({ v }: { v: VariantId }) {
  return (
    <nav className="tabbar" aria-label="Accesos rápidos">
      {NAV.map((n) => (
        <NavLink key={n.to} to={`/${v}/${n.to}`} end={n.end} className="tabbar__link">
          {n.short}
        </NavLink>
      ))}
    </nav>
  );
}

function Footer({ v }: { v: VariantId }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">{BRAND.name}</p>
        <NavItems v={v} />
        <p className="site-footer__note">
          {BRAND.note}. Prototipo de diseño · Propuesta {VARIANTS[v].letter}: {VARIANTS[v].name}.
        </p>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function VariantShell() {
  const { variant } = useParams();
  const ok = isVariant(variant);

  useEffect(() => {
    if (ok) document.documentElement.dataset.variant = variant;
    return () => {
      delete document.documentElement.dataset.variant;
    };
  }, [ok, variant]);

  if (!ok) return <Navigate to="/" replace />;
  const v = variant;

  return (
    <VariantContext.Provider value={v}>
      <ScrollToTop />
      <div className="site" data-variant={v}>
        <a className="skip" href="#main">
          Saltar al contenido
        </a>
        <VariantSwitcher current={v} />
        <Header v={v} />
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer v={v} />
        {v === "c" && <TabBar v={v} />}
      </div>
    </VariantContext.Provider>
  );
}
