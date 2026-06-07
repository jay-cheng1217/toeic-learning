const CACHE_PREFIX = 'toeic-tutor-static';
const CACHE_NAME = `${CACHE_PREFIX}-v31`;

const STATIC_ASSETS = [
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/main.js',
  './assets/js/state.js',
  './assets/js/studyPlan.js',
  './assets/js/listeningPack.js',
  './assets/js/readingPack.js',
  './assets/js/utils.js',
  './assets/js/db.js',
  './assets/js/apiGemini.js',
  './assets/js/render.js',
  './assets/js/practiceViews.js',
  './assets/js/vocab.js',
  './assets/js/srs.js',
  './assets/js/audioPlayer.js',
  './assets/js/audioCodec.js',
  './assets/js/history.js',
  './assets/js/speakingLive.js',
  './assets/js/speakingLevel.js',
  './assets/js/speakingLogView.js',
  './assets/js/exam.js',
  './assets/js/examNormalize.js',
  './assets/js/mic-processor.js',
  './assets/js/driveSync.js',
  './assets/js/storageSafe.js',
  './assets/js/versioning.js',
  './assets/js/errorPolicy.js',
  './assets/js/id.js',
  './assets/js/updater.js',
  './assets/js/installPrompt.js',
  './assets/js/i18n.js',
  './assets/js/i18n/locales/zh-TW.js',
  './assets/js/i18n/locales/ko.js',
  './assets/js/i18n/locales/ja.js',
  './assets/audio/listening/day01.wav',
  './assets/audio/listening/day02.wav',
  './assets/audio/listening/day03.wav',
  './assets/audio/listening/day04.wav',
  './assets/audio/listening/day05.wav',
  './assets/audio/listening/day06.wav',
  './assets/audio/listening/day07.wav',
  './assets/audio/listening/day08.wav',
  './assets/audio/listening/day09.wav',
  './assets/audio/listening/day10.wav',
  './assets/audio/listening/day11.wav',
  './assets/audio/listening/day12.wav',
  './assets/audio/listening/day13.wav',
  './assets/audio/listening/day14.wav',
  './assets/audio/listening/day15.wav',
  './assets/audio/listening/day16.wav',
  './assets/audio/listening/day17.wav',
  './assets/audio/listening/day18.wav',
  './assets/audio/listening/day19.wav',
  './assets/audio/listening/day20.wav',
  './assets/audio/listening/day21.wav',
  './assets/audio/listening/day22.wav',
  './assets/audio/listening/day23.wav',
  './assets/audio/listening/day24.wav',
  './assets/audio/listening/day25.wav',
  './assets/audio/listening/day26.wav',
  './assets/audio/listening/day27.wav',
  './assets/audio/listening/day28.wav',
  './assets/audio/listening/day29.wav',
  './assets/audio/listening/day30.wav',
  './assets/audio/listening/day31.wav',
  './assets/audio/listening/day32.wav',
  './assets/audio/listening/day33.wav',
  './assets/audio/listening/day34.wav',
  './assets/audio/listening/day35.wav',
  './assets/audio/listening/day36.wav',
  './assets/audio/listening/day37.wav',
  './assets/audio/listening/day38.wav',
  './assets/audio/listening/day39.wav',
  './assets/audio/listening/day40.wav',
  './assets/audio/listening/day41.wav',
  './assets/audio/listening/day42.wav',
  './assets/audio/listening/day43.wav',
  './assets/audio/listening/day44.wav',
  './assets/audio/listening/day45.wav',
  './assets/audio/listening/day46.wav',
  './assets/audio/listening/day47.wav',
  './assets/audio/listening/day48.wav',
  './assets/audio/listening/day49.wav',
  './assets/audio/listening/day50.wav',
  './assets/audio/listening/day51.wav',
  './assets/audio/listening/day52.wav',
  './assets/audio/listening/day53.wav',
  './assets/audio/listening/day54.wav',
  './assets/audio/listening/day55.wav',
  './assets/audio/listening/day56.wav',
  './assets/audio/listening/day57.wav',
  './assets/audio/listening/day58.wav',
  './assets/audio/listening/day59.wav',
  './assets/audio/listening/day60.wav',
  './assets/audio/listening/day61.wav',
  './assets/audio/listening/day62.wav',
  './assets/audio/listening/day63.wav',
  './assets/audio/listening/day64.wav',
  './assets/audio/listening/day65.wav',
  './assets/audio/listening/day66.wav',
  './assets/audio/listening/day67.wav',
  './assets/audio/listening/day68.wav',
  './assets/audio/listening/day69.wav',
  './assets/audio/listening/day70.wav',
  './assets/audio/listening/day71.wav',
  './assets/audio/listening/day72.wav',
  './assets/audio/listening/day73.wav',
  './assets/audio/listening/day74.wav',
  './assets/audio/listening/day75.wav',
  './assets/audio/listening/day76.wav',
  './assets/audio/listening/day77.wav',
  './assets/audio/listening/day78.wav',
  './assets/audio/listening/day79.wav',
  './assets/audio/listening/day80.wav',
  './assets/audio/listening/day81.wav',
  './assets/audio/listening/day82.wav',
  './assets/audio/listening/day83.wav',
  './assets/audio/listening/day84.wav',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.delete(CACHE_NAME)
      .then(() => caches.open(CACHE_NAME))
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

function isNavigationRequest(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('Accept') || '';
  return accept.includes('text/html');
}

function isScriptOrStyleRequest(request) {
  return request.destination === 'script' || request.destination === 'style';
}

async function putIfOk(cache, request, response) {
  if (!response || !response.ok) return response;
  await cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (
    url.includes('generativelanguage.googleapis.com') ||
    url.includes('version.json') ||
    url.includes('accounts.google.com') ||
    url.includes('googleapis.com/drive') ||
    url.includes('googleapis.com/oauth')
  ) {
    return;
  }

  if (isNavigationRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  if (isScriptOrStyleRequest(event.request)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const networkResp = await fetch(event.request)
          .then((response) => putIfOk(cache, event.request, response))
          .catch(() => null);
        if (networkResp) return networkResp;
        return cache.match(event.request) || cache.match(event.request, { ignoreSearch: true });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'purgeCaches') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(
        keys
          .filter((k) => k.startsWith(CACHE_PREFIX))
          .map((k) => caches.delete(k))
      ))
    );
  }
});
