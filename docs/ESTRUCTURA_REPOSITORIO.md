# Estructura de la organización

## Decisión de arquitectura

El antiguo monorepo `Portafolio` se dividió en un repositorio por proyecto dentro de la organización `jchernandez-portfolio`. `Portafolio` queda como el repositorio del sitio.

```text
jchernandez-portfolio/
├── Portafolio/                  # sitio GitHub Pages
├── precios-supermercados-sps/   # código en precios-supermercados-sps/
├── mundial-2026/                # código en mundial-2026/
└── pagos-whatsapp-residencial/  # código en pagos-whatsapp-residencial/
```

Cada repo de proyecto guarda su código en una carpeta con el mismo nombre para que workflows, tests, rutas de datos y despliegues (Vercel) no cambien.

## Qué queda en `Portafolio`

- `index.html`, `script.js`: página principal y cargador.
- `css/`, `js/`: estilos, i18n y registro de tarjetas/detalles.
- `<proyecto>/portfolio/`: capa de presentación de cada proyecto (tarjeta, detalle, assets).
- `precios-supermercados-sps/b2c/`: copia publicada de la app Compra Inteligente (SPS y Tegucigalpa). La fuente es `b2c/` en el repo de precios.
- `mundial-2026/dashboard/apps-script/`: código que el detalle de Mundial muestra en el sitio.
- `tests/`: smoke tests del frontend (`portfolio-frontend-qa.yml`).
- `docs/`: estándares del sitio.

## Datos que consume el sitio

- Precios: `https://raw.githubusercontent.com/jchernandez-portfolio/precios-supermercados-sps/portfolio-data/...` (rama publicada por el workflow `precios-supermercados-sps-portfolio-data-sync.yml` de ese repo).
- Mundial: assets estáticos en `mundial-2026/portfolio/assets/`; los scripts Python se leen de `raw.githubusercontent.com/jchernandez-portfolio/mundial-2026/main/`.

## Convenciones

- Repositorios en minúsculas y guiones.
- Un README por repositorio.
- No publicar credenciales, tokens, cookies o datos privados.
- Cambios grandes mediante rama y Pull Request.
