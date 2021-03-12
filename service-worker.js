const cacheName = 'v3'
self.addEventListener('install', e => {
    console.log('Service Worker: installed');
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
        fetch(e.request)
        .then(res => {
            // Make Clone of Response
            const resClone = res.clone();
            caches.open(cacheName)
            .then(cache => {
                // Add Response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(()=> caches.match(e.request).then(res => res))
    )
})