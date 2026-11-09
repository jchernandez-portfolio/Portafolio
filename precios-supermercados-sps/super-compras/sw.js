// La app se mudó a su propio repositorio. Este service worker sólo limpia la copia
// vieja y se da de baja; la página index.html redirige a la dirección nueva.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: "window" }))
    .then((clients) => clients.forEach((client) => client.navigate(client.url))));
});
