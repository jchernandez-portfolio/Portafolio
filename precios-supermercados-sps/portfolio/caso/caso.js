// Página del caso: llena las cifras y la tabla de frescura con datos en vivo.
(() => {
  const BRANCHES = {
    walmart_tgu_ffaa: 'FFAA',
    walmart_tgu_el_sauce: 'El Sauce',
    paiz_tgu_multiplaza: 'Multiplaza',
    paiz_tgu_proceres: 'Próceres'
  };

  function setLive(name, value) {
    document.querySelectorAll(`[data-live="${name}"]`).forEach(node => { node.textContent = value; });
  }

  function shortDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('es-HN', { day: 'numeric', month: 'short', timeZone: 'America/Tegucigalpa' });
  }

  function cell(text, className) {
    const td = document.createElement('td');
    td.textContent = text;
    if (className) td.className = className;
    return td;
  }

  function fillFreshness(sources) {
    const body = document.querySelector('[data-live-fresh] tbody');
    if (!body || !sources.length) return;
    body.replaceChildren(...sources.map(source => {
      const row = document.createElement('tr');
      const branch = BRANCHES[source.location];
      row.append(
        cell(source.city),
        cell(branch ? `${source.chain} · ${branch}` : source.chain),
        cell(source.fresh ? 'Capturado hoy' : `Precio del ${shortDate(source.since)}`, source.fresh ? 'is-ok' : 'is-warn')
      );
      return row;
    }));
  }

  function start() {
    const live = window.SuperComprasLive;
    if (!live) return;
    live.load().then(stats => {
      setLive('products', live.formatNumber(stats.products));
      setLive('chains', String(stats.chains));
      setLive('stores', String(stats.stores));
      setLive('fresh', `${stats.freshStores} / ${stats.stores}`);
      setLive('asOf', live.formatWhen(stats.asOf));
      setLive('issues', live.formatNumber(stats.issues));
      setLive('fixedInWeb', live.formatNumber(stats.fixedInWeb));
      setLive('confirmed', live.formatNumber(stats.confirmed));
      const note = document.querySelector('[data-live-note]');
      if (note) {
        note.textContent = stats.live
          ? (stats.stale.length
            ? `En vivo. Sin captura de hoy: ${stats.stale.map(item => `${item.chain} (${item.city})`).join(', ')}; la app muestra la fecha de esos precios.`
            : 'En vivo: todas las sucursales se capturaron hoy.')
          : 'Cifras verificadas el 24 de octubre de 2026.';
      }
      fillFreshness(stats.sources || []);
      if (!stats.sources?.length) {
        const body = document.querySelector('[data-live-fresh] tbody');
        if (body) body.innerHTML = '<tr><td colspan="3">No se pudo consultar el catálogo en este momento.</td></tr>';
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
