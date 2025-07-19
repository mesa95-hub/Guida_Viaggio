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
  "martedi---2207--napoli---milano.html",
  "mercoledi---2307--milano---gedda.html",
  "giovedi---2407--scoperta-di-gedda.html",
  "venerdi---2507--scoperta-di-gedda.html",
  "sabato---2607--jeddah---singapore.html",
  "domenica---2707--singapore---jakarta.html",
  "lunedi---2807--jakarta---yogykarta.html",
  "martedi---2907--yogykarta---tempio-pranbanan-.html",
  "mercoledi---3007--yogykarta---tempio-borobodur-.html",
  "giovedi---3107--direzione-monte-bromo.html",
  "venerdi---0108--direzione-vulcano-kawah-ijen.html",
  "sabato-208--banyuwangi---pemuteran.html",
  "domenica-lunedi-martedi---3-508--pemuteran.html",
  "mercoledi-608--pemuteran---ubud.html",
  "giovedi---708--ubud.html",
  "venerdi---808--ubud.html",
  "sabato---908--ubud.html",
  "domenica---1008--ubud---komodo.html",
  "lunedi---1108--komodo-.html",
  "1208--komodo.html",
  "mercoledi---1308--labuan-badjo---padang-bai.html",
  "giovedi-venerdi-sabato---14-15-1608--padang-bai.html",
  "domenica-lunedi---17-1808--casa-.html",
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
