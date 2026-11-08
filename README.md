# Catálogo digital de artesanía textil · Prototipo

Tres propuestas visuales navegables para el catálogo, cada una con su revista digital que se hojea.

## Instalación y ejecución
Requiere Node 18 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción en dist/ (se puede abrir con npm run preview)
```

## Cómo recorrer las propuestas
- `/#/`: **comparador**. Presenta las propuestas A, B y C con qué transmite cada una y sus ventajas.
- `/#/a`, `/#/b`, `/#/c`: el inicio de cada propuesta.
- La **barra oscura superior** cambia de propuesta conservando la sección y la página de la revista abierta.
- Secciones de cada propuesta: Inicio · Colecciones · Revista (`/revista/<id>`) · Nuestro trabajo · Contacto.

En la revista:
- **Avanzar y retroceder:** con los botones ‹ ›, las flechas del teclado, Inicio/Fin o deslizando en el celular.
- **Ir a una página:** con el índice que está debajo del libro.
- **Ver un producto:** haz clic en él para abrir el detalle. Al cerrarlo (con ×, Esc o "Volver a la revista") vuelves a la misma página.
- **Precios de ejemplo:** el árbol verde muestra su precio (valor demo). El árbol rosa tiene el precio oculto, así que no aparece en ningún lugar.

## Organización
```
public/img/              fotografías reales (copias con nombre descriptivo de /img)
src/types.ts             contratos de datos
src/data/media.ts        registro de fotos (tamaño + texto alternativo)
src/data/mock/           productos y colecciones simulados
src/data/catalogApi.ts   adaptador de datos (punto único para conectar la API)
src/magazine/            motor de revista + plantillas de página
src/product/             detalle de producto
src/themes/{a,b,c}/      home de cada propuesta
src/pages/               colecciones, revista, nuestro trabajo, contacto
src/styles/              base, revista y un CSS por propuesta
src/prototype/           comparador y selector A/B/C
docs/                    decisiones visuales, arquitectura futura y pendientes
```

## Modificar el contenido simulado
- **Fotos:** copia la imagen a `public/img/` y regístrala en `src/data/media.ts` con su ancho, alto y texto alternativo.
- **Productos:** edita `src/data/mock/products.ts`. Usa `showPrice: false` para ocultar el precio.
- **Colecciones y páginas:** edita `src/data/mock/collections.ts`. Cada página elige una plantilla (`cover`, `editorial`, `feature`, `duo`, `details`, `back`). Un `placeholder` reserva espacio para una pieza sin foto.
