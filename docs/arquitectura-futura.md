# Arquitectura futura (solo proyección, NO implementada)

> La fase 5 queda bloqueada hasta que la clienta apruebe una propuesta y se dé una nueva instrucción.

## Componentes
- **Frontend público:** este catálogo, sin autenticación, que solo consume contenido publicado.
- **Frontend administrativo:** gestión privada de productos, fotos, colecciones, páginas, precios y publicación.
- **Backend/API:** reglas de negocio, validaciones, seguridad (HTTPS, roles, contraseñas protegidas, respaldos y registro de cambios).
- **Base de datos:** productos, categorías, ediciones, páginas, configuraciones y usuarios.
- **Almacenamiento multimedia:** imágenes optimizadas en varios tamaños (por ejemplo 400/800/1600 px en WebP y AVIF) con URL firmadas o públicas según el estado.

## Modelo
- **Producto:** entidad reutilizable (nombre, descripción, imágenes, precio, `showPrice`, estado).
- **Catálogo/Edición:** publicación editorial con portada, estado (borrador, publicada o archivada) y fecha.
- **Página:** composición dentro de una edición (`plantilla` + `orden` + referencias a productos por posición).
- Un producto puede aparecer en varias ediciones (relación N:M a través de las páginas).
- **Versionado:** al publicar una edición se debe congelar una instantánea (páginas y datos visibles de los productos) para que editar un producto no altere de forma involuntaria una edición publicada. Esto hay que evaluarlo.
- El PDF sugiere que un producto deshabilitado no aparezca y que uno agotado se muestre con una etiqueta. Esto queda pendiente de definir, ya que el stock no forma parte de esta etapa.

## Conectar el frontend a la API
1. Mantener las firmas de `src/data/catalogApi.ts` (`getCollections`, `getCollection`, `getProducts`).
2. Reemplazar los mocks por `fetch` (por ejemplo `GET /api/public/collections/:id`) que devuelvan los tipos de `src/types.ts`.
3. **La regla de precio debe aplicarse en el servidor:** la API pública nunca debe enviar el precio cuando `showPrice` es false (hoy lo replica `toPublicProduct`).
4. Pasar `MediaAsset.src` a URLs del almacenamiento e incluir `srcset`.
5. Si aumentan las necesidades de caché, evaluar React Query. Mientras tanto basta `useAsync`.
