/* Service Worker - R2 بلايستيشن (يعمل بدون إنترنت) */
const CACHE = 'r2-ps-v6';
const ASSETS = [
  './', './index.html', './prices.js',
  './pepsi.png', './fanta.png', './sevenup.jpg', './fayrouz.png',
  './sting.jpg', './indomie_cup.jpg', './indomie_bag.jpg', './indomie_box.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// الشبكة أولاً: لو فيه إنترنت ياخد آخر نسخة (فالأسعار الجديدة تظهر من أول فتحة).
// لو مفيش إنترنت أو الشبكة بطيئة (أكتر من 3 ثواني) يفتح من النسخة المحفوظة.
function fromCache(req) {
  return caches.match(req, { ignoreSearch: true }).then((c) =>
    c || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done && r) { done = true; resolve(r); } };

    const timer = setTimeout(() => { fromCache(req).then(finish); }, 3000);

    fetch(url.href, { cache: 'no-cache' })
      .then((res) => {
        clearTimeout(timer);
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        finish(res);
      })
      .catch(() => {
        clearTimeout(timer);
        fromCache(req).then((c) => finish(c || Response.error()));
      });
  }));
});
