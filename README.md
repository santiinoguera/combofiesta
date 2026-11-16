# Combo Fiesta Rosario — sitio web

Landing page de Combo Fiesta (Rosario). React 19 + Vite 7 + Tailwind CSS 4.

## Ejecutar

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera /dist para publicar
npm run preview  # sirve /dist localmente
```

`dist/` es un sitio estático: se puede subir a Netlify, Vercel, GitHub Pages o cualquier hosting.

## Dónde se editan los datos

| Qué | Archivo |
| --- | --- |
| WhatsApp, Instagram, TikTok, horarios, dirección | `src/data/site.js` |
| Combos, precios, cantidades, fotos | `src/data/combos.js` (`combos`) |
| Promociones destacadas | `src/data/combos.js` (`promotions`) |
| SEO (título, descripción, datos estructurados) | `index.html` |

### Cambiar un precio
En `src/data/combos.js`, buscá el combo y cambiá el número en `tiers` (sin puntos: `32900`, no `32.900`).
Las hamburguesas usan `tiers([x12, x24, x36, x48, x60])`.

### Agregar un combo
Copiá un bloque `{ id: ..., category: ..., ... }`, cambiá el `id` (único) y los datos.
La foto va en `src/assets/img/`, se importa arriba del archivo y se asigna en `image`.

### Fotos
Las fotos actuales son recortes de los flyers de Combo Fiesta. Para reemplazarlas por fotografía profesional,
pisá los archivos de `src/assets/img/` con el mismo nombre (formato `.webp`, ~900 px de ancho).
Si la foto nueva ya no es "solo el paquete", sacá `pack: true` de ese combo.
