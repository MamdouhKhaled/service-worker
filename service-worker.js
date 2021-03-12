const cacheName = 'v1'
const cacheAssets = [
    'index.html',
    '/css/style.css',
    '/js/main.js'
]
self.addEventListener('install', e => {
    console.log('Service Worker: installed');
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
})
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove Unwanted Caching 
    e.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    console.log('Service Worker: Clean Older Cache');
                    return caches.delete(cache)
                }
            })
        })
    )
})

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
})