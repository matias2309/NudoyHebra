# Propuestas visuales

Las tres comparten los mismos datos, el motor de revista y el detalle de producto. Lo que cambia es la identidad: tipografía, paleta, composición, navegación, portadas, plantillas y ritmo de animación.

| | A · Editorial artesanal | B · Boutique de autor | C · Artesanía contemporánea |
|---|---|---|---|
| Transmite | Taller cálido, revista de decoración | Valor, calma y pieza de autor | Artesanía actual y dinámica |
| Paleta | Crema, terracota suave, rosa, oliva | Marfil, arena, café, burdeos, dorado | Claro, verde bosque, terracota, rosa, mostaza |
| Tipografía | Fraunces (cursivas) + Karla | Cormorant Garamond + Inter light | Bricolage Grotesque + DM Sans |
| Navegación | Mancheta centrada con separadores | Barra mínima en versalitas | Píldoras; barra de pestañas fija en móvil |
| Home | Foto amplia, recorte "polaroid", capitular, portadas apoyadas como revistas | Una foto enmarcada en dorado, índice numerado en romanos, una pieza por fila | Titular gigante, collage asimétrico, sello, carrusel de portadas |
| Portada de revista | Mancheta sobre papel y foto enmarcada | Foto estrecha con filete dorado, mucho aire | Foto a sangre, bloque verde y sello mostaza |
| Página destacada | Foto a sangre con cartela de papel | Pieza centrada y enmarcada | Foto a sangre con bloque terracota |
| Dos productos | Ritmo orgánico (segunda pieza desplazada) | Columnas sobrias con filete | Asimétrico, grande y pequeño |
| Giro de hoja | 820 ms, suave | 640 ms, sobrio | 700 ms, ágil (420 ms en móvil) |

**Ventajas:** A es la más cercana y deja lucir las fotos. B eleva la percepción de valor y escala bien con más productos. C ofrece la mejor experiencia en el celular y portadas listas para redes.

## Decisiones comunes
- **Giro de página con CSS 3D propio** (`rotateY` + `backface-visibility`) en lugar de una librería como StPageFlip. Pesa 0 KB extra, deja libre la composición de cada página, es accesible (las páginas son HTML real con botones) y es fácil de mantener. Con `prefers-reduced-motion`, el giro se reemplaza por un fundido breve.
- **Escritorio:** portada sola, luego dobles páginas y contraportada. El libro se desplaza para centrar la portada.
- **Móvil:** una página por vista, con swipe, botones grandes y un giro corto de la hoja.
- **Detalle:** `<dialog>` nativo. Es un panel lateral en escritorio y una hoja inferior en móvil, con foco atrapado y Esc para cerrar. La página actual queda en la URL, por lo que nunca se pierde la posición.
- **Plantillas** inspiradas en el PDF de la propuesta (Portada, Destacado y Cuadrícula), ampliadas con Editorial, Detalles y Contraportada.
