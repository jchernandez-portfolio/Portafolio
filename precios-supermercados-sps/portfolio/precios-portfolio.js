// Proyecto principal del portafolio: Súper Compras (precios-supermercados-sps).
// Tarjeta + detalle en <dialog>. Las cifras se leen en vivo del catálogo público
// (super-compras-live.js) y caen a valores verificados si GitHub no responde.
(() => {
  const PROJECT_ID = 'precios-supermercados';
  // La app se publica desde su propio repositorio (GitHub Pages); aquí sólo se enlaza.
  const APP_URL = 'https://jchernandez-portfolio.github.io/precios-supermercados-sps/super-compras/';
  const CASE_URL = 'precios-supermercados-sps/portfolio/caso/';
  const REPO = 'https://github.com/jchernandez-portfolio/precios-supermercados-sps';
  const QUALITY_URL = `${REPO}/tree/calidad-datos`;
  const ASSETS = 'precios-supermercados-sps/portfolio/assets/';

  const translations = {
    es: {
      'card.badge': 'Súper Compras · datos reales diarios',
      'card.previewLabel': 'Ver el detalle de Súper Compras',
      'card.live': 'En vivo',
      'card.updated': 'Actualizado {when}',
      'card.title': 'Súper Compras: los precios de 6 cadenas de supermercados, actualizados cada día',
      'card.body': 'Web app que compara {products} productos en San Pedro Sula y Tegucigalpa. Detrás hay captura diaria automatizada, homologación con el estándar GS1, control de calidad y un registro público de errores.',
      'card.open': 'Explorar proyecto',
      'card.app': 'Ver resultado',
      'card.repo': 'Ver código',
      'stat.products': 'productos con precio',
      'stat.chains': 'cadenas',
      'stat.stores': 'sucursales',
      'stat.cities': 'ciudades',
      'stat.fresh': 'sucursales al día',
      'stat.issues': 'alertas de calidad en seguimiento',
      'stat.fixed': 'datos del súper corregidos en la web',
      'stat.confirmed': 'errores revisados a mano',
      'dialog.close': 'Cerrar',
      'dialog.back': 'Volver a proyectos',
      'hero.kicker': 'Producto digital · datos públicos · automatización',
      'hero.title': 'Súper Compras',
      'hero.question': '¿En qué supermercado me sale más barata mi compra hoy?',
      'hero.body': 'Una web app instalable que responde esa pregunta con precios reales de La Colonia, Colonial, Walmart, PriceSmart, Los Andes y Paiz. Todo el sistema que la alimenta —captura, validación, homologación, publicación y auditoría— corre solo, todos los días, en GitHub Actions.',
      'hero.app': 'Ver resultado',
      'hero.case': 'Leer el caso completo',
      'hero.repo': 'Ver código',
      'live.title': 'Estado de hoy',
      'live.loading': 'Consultando el catálogo publicado…',
      'live.ok': 'Todas las sucursales capturadas hoy.',
      'live.stale': 'Sin captura de hoy: {list}. La web muestra la fecha de esos precios.',
      'live.fallback': 'Cifras verificadas el 24-oct-2026.',
      'app.title': 'La app',
      'app.body': 'Pensada para el celular: busca un producto, compara dónde está más barato y arma tu lista para saber en qué súper conviene comprar todo.',
      'app.inicio': 'Inicio con ofertas del día y la hora de la última actualización.',
      'app.buscar': 'Búsqueda con tamaño y precio por kg/L para comparar presentaciones distintas.',
      'app.producto': 'El mismo producto en cada súper, con el más barato marcado.',
      'app.compra': 'Mi compra: cuánto cuesta la lista completa en cada supermercado.',
      'flow.title': 'Cómo llegan los datos',
      'flow.body': 'Cada mañana una cadena de workflows recorre los catálogos públicos y solo publica lo que pasa todas las validaciones.',
      'flow.1.title': 'Captura',
      'flow.1.body': 'Python + Playwright y clientes HTTP leen el catálogo público de cada sucursal.',
      'flow.2.title': 'Validación',
      'flow.2.body': 'Conteos, identidad y precios deben cuadrar; lo contradictorio queda en cuarentena con evidencia.',
      'flow.3.title': 'Homologación',
      'flow.3.body': 'Código de barras, contenido neto GS1, precio por libra y categorías comunes.',
      'flow.4.title': 'Publicación',
      'flow.4.body': 'Catálogo estático por ciudad (Turso → JSON) sin exponer la base.',
      'flow.5.title': 'Auditoría',
      'flow.5.body': 'Tres veces al día se revisa lo publicado y se actualiza el registro de errores.',
      'quality.title': 'Calidad y transparencia',
      'quality.body': 'Los supermercados publican datos con errores ("1100 Lt", "397 Oz" que son gramos). La web corrige los patrones seguros, esconde lo imposible y lo deja todo registrado en un repositorio público.',
      'quality.link': 'Ver registro de errores',
      'evo.title': 'Evolución',
      'evo.body': 'De un scraper de un supermercado a un producto completo, en cuatro meses.',
      'evo.1.date': 'Jun 2026',
      'evo.1.body': 'Primer scraper (Comisariato Los Andes) y base histórica.',
      'evo.2.date': 'Sep 2026',
      'evo.2.body': '6 cadenas y 11 sucursales con captura programada en GitHub Actions.',
      'evo.3.date': 'Oct 2026',
      'evo.3.body': 'Turso, producto maestro, homologación por código de barras y árbol de categorías.',
      'evo.4.date': '10 oct',
      'evo.4.body': 'Lanzamiento de Súper Compras: PWA, dos ciudades y fotos de producto.',
      'evo.5.date': '15–16 oct',
      'evo.5.body': 'Contenido neto GS1, precio por libra, red de seguridad y registro de errores.',
      'evo.6.date': '24 oct',
      'evo.6.body': 'Captura diaria más robusta y aviso visible cuando un precio no es de hoy.',
      'tech.title': 'Tecnología',
      'tech.body': '{tests} pruebas automáticas, {workflows} workflows y más de {commits} commits.',
      'tech.capture': 'Python, Playwright, httpx',
      'tech.data': 'Turso (SQLite), JSON estático particionado',
      'tech.ops': 'GitHub Actions, GitHub Pages',
      'tech.web': 'JavaScript sin framework, PWA, Service Worker',
      'tech.standards': 'GS1 (GTIN, contenido neto)',
      'end.app': 'Usar Súper Compras',
      'end.case': 'Leer el caso',
      'end.repo': 'Ver repositorio'
    },
    en: {
      'card.badge': 'Súper Compras · real daily data',
      'card.previewLabel': 'View Súper Compras details',
      'card.live': 'Live',
      'card.updated': 'Updated {when}',
      'card.title': 'Súper Compras: prices from 6 supermarket chains, updated every day',
      'card.body': 'A web app comparing {products} products in San Pedro Sula and Tegucigalpa. Behind it: automated daily capture, GS1-based normalization, quality control and a public error registry.',
      'card.open': 'Explore project',
      'card.app': 'View result',
      'card.repo': 'View code',
      'stat.products': 'priced products',
      'stat.chains': 'chains',
      'stat.stores': 'stores',
      'stat.cities': 'cities',
      'stat.fresh': 'stores up to date',
      'stat.issues': 'quality alerts being tracked',
      'stat.fixed': 'retailer data fixed on the web',
      'stat.confirmed': 'manually reviewed errors',
      'dialog.close': 'Close',
      'dialog.back': 'Back to projects',
      'hero.kicker': 'Digital product · public data · automation',
      'hero.title': 'Súper Compras',
      'hero.question': 'Which supermarket has the cheapest basket today?',
      'hero.body': 'An installable web app that answers that question with real prices from La Colonia, Colonial, Walmart, PriceSmart, Los Andes and Paiz. The whole system behind it —capture, validation, normalization, publication and audit— runs on its own every day on GitHub Actions.',
      'hero.app': 'View result',
      'hero.case': 'Read the full case study',
      'hero.repo': 'View code',
      'live.title': 'Today',
      'live.loading': 'Reading the published catalog…',
      'live.ok': 'Every store was captured today.',
      'live.stale': 'Not captured today: {list}. The app shows the date of those prices.',
      'live.fallback': 'Figures verified on Oct 24, 2026.',
      'app.title': 'The app',
      'app.body': 'Built for phones: search a product, see where it is cheapest and build a list to learn which supermarket is best for the whole basket.',
      'app.inicio': 'Home with today’s deals and the last update time.',
      'app.buscar': 'Search with size and price per kg/L to compare different packs.',
      'app.producto': 'The same product at every store, cheapest highlighted.',
      'app.compra': 'My list: what the whole basket costs at each supermarket.',
      'flow.title': 'How the data arrives',
      'flow.body': 'Every morning a chain of workflows reads the public catalogs and only publishes what passes every check.',
      'flow.1.title': 'Capture',
      'flow.1.body': 'Python + Playwright and HTTP clients read each store’s public catalog.',
      'flow.2.title': 'Validation',
      'flow.2.body': 'Counts, identity and prices must reconcile; contradictions are quarantined with evidence.',
      'flow.3.title': 'Normalization',
      'flow.3.body': 'Barcodes, GS1 net content, price per pound and shared categories.',
      'flow.4.title': 'Publication',
      'flow.4.body': 'Static per-city catalog (Turso → JSON) without exposing the database.',
      'flow.5.title': 'Audit',
      'flow.5.body': 'Three times a day the published data is reviewed and the error registry updated.',
      'quality.title': 'Quality and transparency',
      'quality.body': 'Retailers publish faulty data ("1100 Lt", "397 Oz" that are grams). The app fixes safe patterns, hides the impossible and logs everything in a public repository.',
      'quality.link': 'View error registry',
      'evo.title': 'Evolution',
      'evo.body': 'From a single-store scraper to a complete product in four months.',
      'evo.1.date': 'Jun 2026',
      'evo.1.body': 'First scraper (Comisariato Los Andes) and price history.',
      'evo.2.date': 'Sep 2026',
      'evo.2.body': '6 chains and 11 stores with scheduled capture on GitHub Actions.',
      'evo.3.date': 'Oct 2026',
      'evo.3.body': 'Turso, product master, barcode matching and category tree.',
      'evo.4.date': 'Oct 10',
      'evo.4.body': 'Súper Compras launch: PWA, two cities and product photos.',
      'evo.5.date': 'Oct 15–16',
      'evo.5.body': 'GS1 net content, price per pound, safety net and error registry.',
      'evo.6.date': 'Oct 24',
      'evo.6.body': 'Sturdier daily capture and a visible notice when a price is not from today.',
      'tech.title': 'Technology',
      'tech.body': '{tests} automated tests, {workflows} workflows and {commits}+ commits.',
      'tech.capture': 'Python, Playwright, httpx',
      'tech.data': 'Turso (SQLite), partitioned static JSON',
      'tech.ops': 'GitHub Actions, GitHub Pages',
      'tech.web': 'Framework-free JavaScript, PWA, Service Worker',
      'tech.standards': 'GS1 (GTIN, net content)',
      'end.app': 'Use Súper Compras',
      'end.case': 'Read the case study',
      'end.repo': 'View repository'
    }
  };

  const FACTS = Object.freeze({ tests: '3,100', workflows: 12, commits: '2,600' });

  function i18n() { return window.PortfolioI18n; }
  function locale() { return i18n()?.getLocale?.() === 'en' ? 'en' : 'es'; }
  function t(key, vars = {}) {
    const value = i18n()?.t(`prices.${key}`, vars);
    if (value && value !== `prices.${key}`) return value;
    return (translations[locale()][key] ?? key).replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
  }
  function live() { return window.SuperComprasLive; }
  function num(value) { return live()?.formatNumber(value, locale()) ?? String(value); }

  let stats = window.SuperComprasLive?.FALLBACK ?? null;
  let statsLive = false;

  function registerTranslations() {
    const api = i18n();
    if (!api) throw new Error('El módulo de precios requiere PortfolioI18n.');
    api.registerCatalog('prices', translations);
  }

  function phone(name, alt, extra = '') {
    return `<img class="sc-phone ${extra}" src="${ASSETS}app-${name}.webp" alt="${alt}" width="520" height="1125" loading="lazy" decoding="async">`;
  }

  function cardStats() {
    const s = stats || {};
    return `
      <span><strong data-sc-stat="products">${num(s.products ?? 0)}</strong><small>${t('stat.products')}</small></span>
      <span><strong data-sc-stat="chains">${s.chains ?? 6}</strong><small>${t('stat.chains')}</small></span>
      <span><strong data-sc-stat="stores">${s.stores ?? 11}</strong><small>${t('stat.stores')}</small></span>
      <span><strong data-sc-stat="cities">${s.cities ?? 2}</strong><small>${t('stat.cities')}</small></span>`;
  }

  function updatedLabel() {
    const when = stats?.asOf ? live()?.formatWhen(stats.asOf, locale()) : '';
    return when ? t('card.updated', { when }) : '';
  }

  function card() {
    return `
      <article class="card project-card price-card fade-in is-visible">
        <button class="price-card__preview sc-card__visual" data-price-open type="button" aria-label="${t('card.previewLabel')}">
          <span class="sc-card__phones" aria-hidden="true">
            ${phone('producto', '', 'is-left')}
            ${phone('inicio', '', 'is-center')}
            ${phone('compra', '', 'is-right')}
          </span>
          <span class="sc-card__side">
            <span class="sc-card__pulse" data-sc-live="${statsLive}"><i aria-hidden="true"></i><span>${t('card.live')}</span><em data-sc-updated>${updatedLabel()}</em></span>
            <span class="price-card__signal sc-card__stats">${cardStats()}</span>
          </span>
        </button>
        <div class="price-card__content">
          <p class="price-card__badge">${t('card.badge')}</p>
          <div class="tags">
            <span class="tag">Python</span>
            <span class="tag">Playwright</span>
            <span class="tag">GitHub Actions</span>
            <span class="tag">Turso · SQLite</span>
            <span class="tag">JavaScript PWA</span>
            <span class="tag">GS1</span>
          </div>
          <h3>${t('card.title')}</h3>
          <p data-sc-body>${t('card.body', { products: num(stats?.products ?? 0) })}</p>
          <div class="price-card__actions">
            <button class="text-link" data-price-open type="button">${t('card.open')}</button>
            <a class="text-link" href="${APP_URL}">${t('card.app')}</a>
            <a class="text-link text-link--muted" href="${REPO}" target="_blank" rel="noopener noreferrer">${t('card.repo')}</a>
          </div>
        </div>
      </article>`;
  }

  function liveStatus() {
    if (!stats) return `<p class="sc-live__note">${t('live.loading')}</p>`;
    if (!statsLive) return `<p class="sc-live__note">${t('live.fallback')}</p>`;
    if (!stats.stale?.length) return `<p class="sc-live__note is-ok">${t('live.ok')}</p>`;
    const list = stats.stale.map(item => `${item.chain} (${item.city})`).join(', ');
    return `<p class="sc-live__note is-warn">${t('live.stale', { list })}</p>`;
  }

  function livePanel() {
    const s = stats || {};
    return `
      <div class="sc-live__head"><span class="sc-live__dot" aria-hidden="true"></span><strong>${t('live.title')}</strong><em>${updatedLabel()}</em></div>
      <dl class="sc-live__grid">
        <div><dt>${t('stat.products')}</dt><dd>${num(s.products ?? 0)}</dd></div>
        <div><dt>${t('stat.fresh')}</dt><dd>${s.freshStores ?? '—'} / ${s.stores ?? 11}</dd></div>
        <div><dt>${t('stat.issues')}</dt><dd>${num(s.issues ?? 0)}</dd></div>
        <div><dt>${t('stat.fixed')}</dt><dd>${num(s.fixedInWeb ?? 0)}</dd></div>
      </dl>
      ${liveStatus()}`;
  }

  function view() {
    const steps = [1, 2, 3, 4, 5].map(n => `<article class="price-flow__step${n === 1 ? ' is-scraping' : ''}"><b>0${n}</b><strong>${t(`flow.${n}.title`)}</strong><span>${t(`flow.${n}.body`)}</span></article>`).join('');
    const shots = ['inicio', 'buscar', 'producto', 'compra'].map(name => `
      <figure class="sc-shot">${phone(name, t(`app.${name}`))}<figcaption>${t(`app.${name}`)}</figcaption></figure>`).join('');
    const evolution = [1, 2, 3, 4, 5, 6].map(n => `<li><b>${t(`evo.${n}.date`)}</b><span>${t(`evo.${n}.body`)}</span></li>`).join('');
    const tech = ['capture', 'data', 'ops', 'web', 'standards'].map(key => `<li>${t(`tech.${key}`)}</li>`).join('');
    const s = stats || {};
    return `
      <dialog class="price-view sc-view" id="price-project-view" aria-labelledby="price-title">
        <div class="price-view__top">
          <span class="price-view__brand">JC HERNANDEZ</span>
          <button class="price-close" data-price-close type="button">${t('dialog.close')}</button>
        </div>
        <div class="price-view__body">
          <header class="price-hero sc-hero">
            <div>
              <p class="price-kicker">${t('hero.kicker')}</p>
              <h2 id="price-title">${t('hero.title')}</h2>
              <p class="price-hero__question">${t('hero.question')}</p>
              <p>${t('hero.body')}</p>
              <div class="sc-actions portfolio-detail__actions">
                <a class="price-link is-primary" href="${APP_URL}" data-sc-app>${t('hero.app')}</a>
                <a class="price-link" href="${CASE_URL}" data-sc-case>${t('hero.case')}</a>
                <a class="price-link" href="${REPO}" target="_blank" rel="noopener noreferrer">${t('hero.repo')}</a>
              </div>
            </div>
            <aside class="price-stage sc-live" aria-label="${t('live.title')}" data-sc-live-panel>${livePanel()}</aside>
          </header>

          <section class="price-section" aria-labelledby="price-app-title">
            <div class="price-section__head">
              <p class="price-eyebrow">01</p>
              <h3 id="price-app-title">${t('app.title')}</h3>
              <p>${t('app.body')}</p>
            </div>
            <div class="sc-shots">${shots}</div>
          </section>

          <section class="price-section" aria-labelledby="price-flow-title">
            <div class="price-section__head">
              <p class="price-eyebrow">02</p>
              <h3 id="price-flow-title">${t('flow.title')}</h3>
              <p>${t('flow.body')}</p>
            </div>
            <div class="price-flow">${steps}</div>
          </section>

          <section class="price-section" aria-labelledby="price-quality-title">
            <div class="price-section__head">
              <p class="price-eyebrow">03</p>
              <h3 id="price-quality-title">${t('quality.title')}</h3>
              <p>${t('quality.body')}</p>
            </div>
            <div class="price-kpis sc-quality" data-sc-quality>
              <div class="price-kpi"><strong>${num(s.issues ?? 0)}</strong><span>${t('stat.issues')}</span></div>
              <div class="price-kpi"><strong>${num(s.fixedInWeb ?? 0)}</strong><span>${t('stat.fixed')}</span></div>
              <div class="price-kpi"><strong>${num(s.confirmed ?? 0)}</strong><span>${t('stat.confirmed')}</span></div>
              <div class="price-kpi"><strong>${s.freshStores ?? '—'} / ${s.stores ?? 11}</strong><span>${t('stat.fresh')}</span></div>
            </div>
            <p class="sc-quality__link"><a class="price-link" href="${QUALITY_URL}" target="_blank" rel="noopener noreferrer">${t('quality.link')}</a></p>
          </section>

          <section class="price-section" aria-labelledby="price-evo-title">
            <div class="price-section__head">
              <p class="price-eyebrow">04</p>
              <h3 id="price-evo-title">${t('evo.title')}</h3>
              <p>${t('evo.body')}</p>
            </div>
            <ol class="sc-timeline">${evolution}</ol>
          </section>

          <section class="price-section" aria-labelledby="price-tech-title">
            <div class="price-section__head">
              <p class="price-eyebrow">05</p>
              <h3 id="price-tech-title">${t('tech.title')}</h3>
              <p>${t('tech.body', FACTS)}</p>
            </div>
            <ul class="sc-tech">${tech}</ul>
            <div class="price-end-actions">
              <button class="price-back" data-price-close type="button">${t('dialog.back')}</button>
              <a class="price-link is-primary" href="${APP_URL}">${t('end.app')}</a>
              <a class="price-link" href="${CASE_URL}">${t('end.case')}</a>
              <a class="price-link" href="${REPO}" target="_blank" rel="noopener noreferrer">${t('end.repo')}</a>
            </div>
          </section>
        </div>
      </dialog>`;
  }

  function templateElement(markup) {
    const template = document.createElement('template');
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  }

  function setup({ card: cardElement, detail }) {
    if (!(detail instanceof HTMLDialogElement)) throw new Error('El detalle de precios debe montarse como dialog nativo.');
    let opener = null;

    function open(event) {
      opener = event.currentTarget;
      if (!detail.open) detail.showModal();
      document.body.classList.add('is-locked');
      detail.scrollTop = 0;
      detail.querySelector('[data-price-close]')?.focus();
    }

    function close() { if (detail.open) detail.close(); }
    function restoreAfterClose() {
      document.body.classList.remove('is-locked');
      if (opener?.isConnected) opener.focus();
    }

    // Solo se reemplazan las partes con cifras para no romper lo que agregan los estándares.
    function refreshFigures() {
      const stat = cardElement.querySelector('.sc-card__stats');
      if (stat) stat.innerHTML = cardStats();
      const pulse = cardElement.querySelector('.sc-card__pulse');
      if (pulse) pulse.dataset.scLive = String(statsLive);
      const updated = cardElement.querySelector('[data-sc-updated]');
      if (updated) updated.textContent = updatedLabel();
      const body = cardElement.querySelector('[data-sc-body]');
      if (body) body.textContent = t('card.body', { products: num(stats?.products ?? 0) });
      const panel = detail.querySelector('[data-sc-live-panel]');
      if (panel) panel.innerHTML = livePanel();
      const quality = detail.querySelector('[data-sc-quality]');
      const fresh = templateElement(view()).querySelector('[data-sc-quality]');
      if (quality && fresh) quality.innerHTML = fresh.innerHTML;
    }

    cardElement.addEventListener('click', event => {
      const control = event.target.closest('[data-price-open]');
      if (control && cardElement.contains(control)) open({ currentTarget: control });
    });
    detail.addEventListener('click', event => { if (event.target.closest('[data-price-close]')) close(); });
    detail.addEventListener('close', restoreAfterClose);
    detail.addEventListener('cancel', () => document.body.classList.remove('is-locked'));

    i18n().onChange(() => {
      const wasOpen = detail.open;
      cardElement.innerHTML = templateElement(card()).innerHTML;
      detail.innerHTML = templateElement(view()).innerHTML;
      if (wasOpen) {
        opener = cardElement.querySelector('[data-price-open]');
        detail.querySelector('[data-price-close]')?.focus();
      }
    });

    live()?.load().then(result => {
      stats = result;
      statsLive = Boolean(result.live);
      refreshFigures();
    });
  }

  function mount() {
    if (!window.PortfolioProjects || !i18n()) {
      console.error('No se encontraron las dependencias del proyecto Súper Compras.');
      return;
    }
    registerTranslations();
    window.PortfolioProjects.register({ id: PROJECT_ID, cardHtml: card(), detailHtml: view(), setup });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
