import { useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getCollection } from "../data/catalogApi";
import { useAsync, useDocumentTitle } from "../lib/hooks";
import { useVariant } from "../components/shared";
import { MagazineViewer } from "../magazine/MagazineViewer";
import { ProductDetail } from "../product/ProductDetail";
import { BRAND } from "../variants";

export function MagazinePage() {
  const { collectionId = "" } = useParams();
  const v = useVariant();
  const data = useAsync(() => getCollection(collectionId), [collectionId]);
  const [params, setParams] = useSearchParams();
  useDocumentTitle(`${data?.collection.title ?? "Revista"} · ${BRAND.name}`);

  const setProduct = useCallback(
    (id: string | null) =>
      setParams(
        (prev) => {
          const n = new URLSearchParams(prev);
          if (id) n.set("producto", id);
          else n.delete("producto");
          return n;
        },
        { replace: true },
      ),
    [setParams],
  );

  if (data === undefined) return <div className="mag-loading" aria-busy="true" />;
  if (data === null || data.collection.id !== collectionId)
    return (
      <section className="page-empty">
        <h1>Esta edición no existe</h1>
        <Link to={`/${v}/colecciones`}>Ver colecciones</Link>
      </section>
    );

  const pid = params.get("producto");
  const product = pid ? data.products[pid] ?? null : null;

  return (
    <div className="mag-page">
      <header className="mag-head">
        <Link to={`/${v}/colecciones`} className="mag-head__back">
          <span aria-hidden="true">←</span> Colecciones
        </Link>
        <h1 className="mag-head__title">{data.collection.title}</h1>
        <p className="mag-head__issue">{data.collection.issue}</p>
      </header>
      <MagazineViewer data={data} onSelect={setProduct} detailOpen={!!product} />
      <ProductDetail product={product} onClose={() => setProduct(null)} />
    </div>
  );
}
