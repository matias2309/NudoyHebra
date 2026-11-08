# CLAUDE.md

Prototipo frontend de un catálogo digital de artesanía textil (macramé y decoración) con tres propuestas visuales (A, B y C) y una revista que se hojea.

## Estado y restricciones
- **Etapa actual:** prototipos visuales para que la clienta elija una dirección. Las fases 1 a 4 están completas.
- **Fase 5 bloqueada:** NO implementar backend, base de datos, panel administrativo, autenticación, CRUD, carrito, stock, pedidos, pagos ni despachos sin una autorización explícita nueva.
- Usar solo fotografías reales (`public/img`). No usar imágenes generadas por IA ni alterar productos. No inventar medidas, materiales, historia de marca ni datos comerciales.
- Precio: si `showPrice` es false, el precio no se renderiza de ninguna forma (ni `$0`, ni placeholder, ni hueco, ni "Consultar precio"). El adaptador entrega `price: null`.
- Toda la marca, los textos, las colecciones y los precios son provisionales o demostrativos, y deben verse como tales.

## Stack
React 18 + TypeScript (strict) + Vite 5 + react-router-dom 6 (HashRouter). CSS plano con tokens por propuesta. Sin otras dependencias de runtime.

## Comandos
- `npm run dev`: servidor de desarrollo (http://localhost:5173)
- `npm run build`: chequeo de tipos y build de producción en `dist/`
- `npm run typecheck`: solo tipos

## Arquitectura
- `src/types.ts`: contratos (Product, PublicProduct, Collection, MagazinePage).
- `src/data/mock/*`: datos simulados. `src/data/catalogApi.ts`: **único** acceso a datos (lo que se cambia por la API).
- `src/data/media.ts`: registro de fotos (src, tamaño, alt).
- `src/magazine/`: motor de revista compartido. `useMagazine` maneja la paginación con la página en la URL (`?p=`); `MagazineViewer` maneja el giro CSS 3D, el teclado, el swipe y el índice; `templates/Pages.tsx` contiene las plantillas.
- `src/product/ProductDetail.tsx`: detalle en `<dialog>` (`?producto=` en la URL).
- `src/themes/{a,b,c}/Home*.tsx`: home propio de cada propuesta. Las demás páginas son compartidas (`src/pages`).
- `src/styles/theme-*.css`: toda la identidad de cada propuesta, aislada con `[data-variant="x"]`.
- `src/prototype/`: comparador y selector A/B/C (solo del prototipo).

## Convenciones
- La lógica no se duplica por propuesta: las diferencias visuales van en CSS y en el Home de cada una.
- Las páginas de revista usan unidades de contenedor (`cqw`/`cqh`) para escalar como papel.
- Los `useEffect` no deben devolver valores (usar cuerpo con llaves).
- Respetar `prefers-reduced-motion`, la navegación por teclado y evitar el scroll horizontal.
