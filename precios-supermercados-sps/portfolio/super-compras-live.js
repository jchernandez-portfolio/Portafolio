// Cifras en vivo de Súper Compras para el portafolio y la página del caso.
// Lee solo archivos públicos ya publicados (catálogo estático y rama calidad-datos);
// si algo falla, quien lo use muestra las cifras de respaldo.
(() => {
  if (window.SuperComprasLive) return;

  const RAW = 'https://raw.githubusercontent.com/jchernandez-portfolio/precios-supermercados-sps';
  const CATALOG = `${RAW}/portfolio-data/precios-supermercados-sps/published/rpi/v3/`;
  const QUALITY = `${RAW}/calidad-datos/`;
  const CHAIN_NAMES = Object.freeze({
    la_colonia: 'La Colonia',
    colonial: 'Colonial',
    walmart: 'Walmart',
    pricesmart: 'PriceSmart',
    comisariato_los_andes: 'Los Andes',
    paiz: 'Paiz'
  });

  // Respaldo verificado el 24-oct-2026 (se usa si GitHub no responde).
  const FALLBACK = Object.freeze({
    live: false,
    asOf: '2026-10-24T21:00:42Z',
    products: 67377,
    cities: 2,
    chains: 6,
    stores: 11,
    freshStores: 9,
    stale: [],
    sources: [],
    issues: 1692,
    fixedInWeb: 43,
    confirmed: 34
  });

  async function json(url) {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.json();
  }

  async function text(url) {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.text();
  }

  function csvRows(source) {
    const [header, ...lines] = source.trim().split(/\r?\n/);
    const keys = header.split(',');
    return lines.map(line => {
      const cells = [];
      let cell = '';
      let quoted = false;
      for (const char of line) {
        if (char === '"') quoted = !quoted;
        else if (char === ',' && !quoted) { cells.push(cell); cell = ''; }
        else cell += char;
      }
      cells.push(cell);
      return Object.fromEntries(keys.map((key, index) => [key, cells[index] ?? '']));
    });
  }

  async function quality() {
    const [history, confirmed] = await Promise.all([
      text(`${QUALITY}historial.csv`).then(csvRows),
      text(`${QUALITY}errores_confirmados.csv`).then(csvRows).catch(() => [])
    ]);
    const latestByCity = new Map();
    history.forEach(row => {
      const current = latestByCity.get(row.ciudad);
      if (!current || row.catalogo > current) latestByCity.set(row.ciudad, row.catalogo);
    });
    let issues = 0;
    let fixedInWeb = 0;
    history.forEach(row => {
      if (latestByCity.get(row.ciudad) !== row.catalogo) return;
      const count = Number(row.cantidad) || 0;
      if (/corregido/i.test(row.problema)) fixedInWeb += count;
      else issues += count;
    });
    return { issues, fixedInWeb, confirmed: confirmed.length };
  }

  async function catalog() {
    const index = await json(`${CATALOG}cities.json`);
    const cities = (index.cities || []).filter(city => /^[\w/.-]*manifest\.json$/.test(city.manifest || '') && !city.manifest.includes('..'));
    const manifests = await Promise.all(cities.map(city => json(CATALOG + city.manifest).then(manifest => ({ city, manifest }))));
    const chains = new Set();
    const stale = [];
    const sources = [];
    let products = 0;
    let stores = 0;
    let freshStores = 0;
    let asOf = '';
    manifests.forEach(({ city, manifest }) => {
      products += Number(manifest.visible_rows) || 0;
      if ((manifest.as_of || '') > asOf) asOf = manifest.as_of;
      (manifest.source_freshness || []).forEach(source => {
        stores += 1;
        chains.add(source.supermarket_id);
        sources.push({ city: city.name, chain: CHAIN_NAMES[source.supermarket_id] || source.supermarket_id, location: source.location_id, fresh: source.status === 'FRESH', since: source.last_successful_at });
        if (source.status === 'FRESH') freshStores += 1;
        else stale.push({ city: city.name, chain: CHAIN_NAMES[source.supermarket_id] || source.supermarket_id, since: source.last_successful_at });
      });
    });
    return { products, cities: manifests.length, chains: chains.size, stores, freshStores, stale, sources, asOf };
  }

  let pending = null;
  function load() {
    if (!pending) {
      pending = Promise.all([catalog(), quality().catch(() => ({}))])
        .then(([catalogStats, qualityStats]) => ({ ...FALLBACK, ...qualityStats, ...catalogStats, live: true }))
        .catch(error => {
          console.warn('Súper Compras: usando cifras de respaldo.', error);
          return { ...FALLBACK };
        });
    }
    return pending;
  }

  function formatNumber(value, locale = 'es') {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-HN').format(value);
  }

  function formatWhen(iso, locale = 'es') {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const tag = locale === 'en' ? 'en-US' : 'es-HN';
    const today = new Date();
    const sameDay = date.toDateString() === today.toDateString();
    const time = date.toLocaleTimeString(tag, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Tegucigalpa' });
    if (sameDay) return locale === 'en' ? `today, ${time}` : `hoy, ${time}`;
    const day = date.toLocaleDateString(tag, { day: 'numeric', month: 'short', timeZone: 'America/Tegucigalpa' });
    return `${day}, ${time}`;
  }

  window.SuperComprasLive = Object.freeze({ load, formatNumber, formatWhen, FALLBACK, CHAIN_NAMES });
})();
