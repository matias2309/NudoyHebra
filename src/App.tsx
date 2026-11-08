import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { VariantShell } from "./layout/VariantShell";
import { Comparator } from "./prototype/Comparator";
import { MagazinePage } from "./pages/MagazinePage";
import { CollectionsPage, ContactPage, WorkPage } from "./pages/SharedPages";
import { HomeA } from "./themes/a/HomeA";
import { HomeB } from "./themes/b/HomeB";
import { HomeC } from "./themes/c/HomeC";
import { useVariant } from "./components/shared";

function Home() {
  const v = useVariant();
  return v === "a" ? <HomeA /> : v === "b" ? <HomeB /> : <HomeC />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Comparator />} />
        <Route path="/:variant" element={<VariantShell />}>
          <Route index element={<Home />} />
          <Route path="colecciones" element={<CollectionsPage />} />
          <Route path="revista/:collectionId" element={<MagazinePage />} />
          <Route path="trabajo" element={<WorkPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="." replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
