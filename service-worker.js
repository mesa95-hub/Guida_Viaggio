const cacheName = "viaggio-cache-v1";
const filesToCache = [
  "index.html",
  "manifest.json",
  "service-worker.js",
  "static/tailwind.min.css",
  "static/icon.png",

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
  "17-18-08--casa-🏡.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
