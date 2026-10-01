# Portafolio de datos y automatización

Portafolio profesional de **Juan Carlos Hernández Ramos**, enfocado en reportes, dashboards, preparación de datos, automatización de procesos y proyectos de datos aplicados a problemas reales.

**Sitio publicado:** https://jchernandez-portfolio.github.io/Portafolio/

El sitio funciona en **español e inglés**, con español como idioma predeterminado.

## Organización

Desde octubre de 2026 el portafolio vive en la organización de GitHub [**jchernandez-portfolio**](https://github.com/jchernandez-portfolio), con un repositorio por proyecto:

| Repositorio | Contenido |
| --- | --- |
| [Portafolio](https://github.com/jchernandez-portfolio/Portafolio) | Este sitio (GitHub Pages): HTML, CSS, JS compartido y la capa de presentación `*/portfolio/` de cada proyecto |
| [precios-supermercados-sps](https://github.com/jchernandez-portfolio/precios-supermercados-sps) | Web scraping, monitoreo e inteligencia de precios |
| [mundial-2026](https://github.com/jchernandez-portfolio/mundial-2026) | Análisis histórico y predicción del Mundial 2026 |
| [pagos-whatsapp-residencial](https://github.com/jchernandez-portfolio/pagos-whatsapp-residencial) | App de registro de pagos del residencial |

```text
Portafolio/
├── .github/workflows/portfolio-frontend-qa.yml
├── css/  js/  docs/  tests/
├── precios-supermercados-sps/portfolio/   # tarjeta y detalle publicados en el sitio
├── mundial-2026/portfolio/                # tarjeta, detalle y assets del dashboard
├── mundial-2026/dashboard/apps-script/    # código Apps Script que se muestra en el detalle
├── index.html
└── script.js
```

El código, los datos, los tests y los workflows de cada proyecto viven en su propio repositorio, dentro de una carpeta con el mismo nombre del proyecto (así sus workflows y rutas no cambiaron). Este repo solo conserva lo que el sitio necesita para mostrarlos. Los datos públicos de precios se leen de la rama `portfolio-data` del repo `precios-supermercados-sps`.

El historial completo del antiguo monorepo (commits y ramas) se conserva en este repositorio.

## Proyectos publicados

### 1. Monitoreo automatizado de precios — Web Scraping

Proyecto principal del portafolio. Obtiene precios y promociones desde sitios web públicos de supermercados, valida las capturas, estructura los datos y conserva su histórico para análisis.

Estado público verificado al **8 de septiembre de 2026**:

- **6 supermercados / cadenas productivas integradas**.
- **11 ubicaciones monitoreadas**.
- **58K+ productos registrados** (`58,114` en el corte verificado).
- **127K+ registros históricos de precio** (`127,980` en el corte verificado).
- Cobertura actual en **San Pedro Sula y Tegucigalpa**.
- Cadenas con datos aceptados: **La Colonia, Supermercados Colonial, Walmart, PriceSmart, Comisariato Los Andes y Paiz**.
- Evidencia pública de una captura aceptada con **6,646 productos con precio** y **120 promociones**.
- Comparador cross-source **fail-closed**: una fila sólo puede entrar a ahorro, mejor precio o canasta cuando existe identidad fuerte y coherencia comercial; marca + presentación por sí solas no autorizan una equivalencia.
- Analítica intra-cadena respaldada por evidencia, como la comparación completa de Walmart TGU con `12,042` artículos comercialmente comparables y `255` con al menos una diferencia comercial.

El detalle del sitio enlaza la **página de origen**, la **evidencia versionada en GitHub** y el **código de extracción** para que la capacidad de web scraping sea comprobable y no sólo declarativa.

**Repositorio:** [precios-supermercados-sps](https://github.com/jchernandez-portfolio/precios-supermercados-sps)

**Procedencia de la presentación:** [`docs/portfolio-showcase.md`](https://github.com/jchernandez-portfolio/precios-supermercados-sps/blob/main/precios-supermercados-sps/docs/portfolio-showcase.md)

**Metodología del comparador:** [`docs/COMPARATOR-METHODOLOGY.md`](https://github.com/jchernandez-portfolio/precios-supermercados-sps/blob/main/precios-supermercados-sps/docs/COMPARATOR-METHODOLOGY.md)

### 2. Mundial 2026: análisis histórico y predicción

Proyecto de datos que integra información histórica, calendario, ranking y resultados recientes para generar análisis, predicciones y una aplicación web interactiva.

- **Repositorio:** [mundial-2026](https://github.com/jchernandez-portfolio/mundial-2026)
- **Dashboard:** https://script.google.com/macros/s/AKfycbzE26z7tcEbnwLPKSLLW8H_rK7UqwKV17rV8YBJVT4lB4slY0qorsf8cL4cnsys5ShGhw/exec
- **Tecnologías:** Python, Google Sheets, Google Apps Script, Chart.js y GitHub Actions.

### 3. Pagos WhatsApp Residencial

Aplicación Next.js para registrar y conciliar los pagos de un residencial a través de WhatsApp.

- **Repositorio:** [pagos-whatsapp-residencial](https://github.com/jchernandez-portfolio/pagos-whatsapp-residencial)
- **Demo:** https://pagos-whatsapp-residencial.vercel.app

## Proyectos futuros

Cada proyecto nuevo se crea como un **repositorio propio** dentro de la organización. Para mostrarlo en el sitio se agrega su carpeta `<slug>/portfolio/` aquí y se registra en `js/main.js`. Consulta [`PROJECT_TEMPLATE.md`](PROJECT_TEMPLATE.md) y [`docs/ESTRUCTURA_REPOSITORIO.md`](docs/ESTRUCTURA_REPOSITORIO.md).
