const cacheName = "viaggio-cache-v2";

// File da salvare in cache per l'accesso offline
const filesToCache = [
  "index.html",
  "manifest.json",
  "service-worker.js",
  "static/tailwind.min.css",
  "static/icon.png",
  "static/noi.jpg", // se hai aggiunto una foto personale

  // Tutte le tue pagine giorno per giorno:
  "martedi--22-07--in-viaggio-verso-gedda.html",
  "mercoledi--23-07--in-viaggio-verso-gedda.html",
  "giovedi--24-07--scoperta-di-gedda.html",
  "venerdi--25-07--scoperta-di-gedda.html",
  "sabato--26-07--direzione-jakarta✈️.html",
  "domenica--27-07--direzione-jakarta✈️.html",
  "lunedi--28-07--yogykarta✈️.html",
  "martedì--29-07--yogykarta---tempio-pranbanan-🕌.html",
  "30-07--yogykarta---tempio-borobodur-🕌.html",
  "31-07--direzione-monte-bromo🌋.html",
  "01-08--direzione-vulcano-kawah-ijen🌋.html",
  "2-08--direzione-pemuteran🏝️.html",
  "3-5-08--direzione-pemuteran🏝️.html",
  "6-08--direzione-ubud🐒.html",
  "7-08--ubud🐒.html",
  "8-08--ubud🐒.html",
  "9-08--ubud🐒.html",
  "10-08--direzione-komodo🐊.html",
  "11-08--komodo-🐊.html",
  "12-08--komodo🐊.html",
  "13-08--padang-bai🐠.html",
  "14-15-16-17-08--padang-bai🐠.html",
  "17-18-08--casa-🏡.html",
  "offline.html"
];

// 🔧 Installazione del service worker
self.addEventListener("install", (event) => {
  console.log("📦 Service worker in installazione...");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// 🔁 Attivazione e pulizia vecchie cache
self.addEventListener("activate", (event) => {
  console.log("🧹 Attivazione SW e pulizia vecchie cache...");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("🗑️ Eliminata cache vecchia:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 🌐 Intercetta tutte le richieste
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se il file è in cache → lo restituisce
      if (response) {
        return response;
      }

      // Altrimenti prova a recuperarlo online
      return fetch(event.request).catch(() => {
        // Se offline e file non trovato, mostra pagina offline (se è richiesta HTML)
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("offline.html");
        }
      });
    })
  );
});
