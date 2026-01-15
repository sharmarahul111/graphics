self.addEventListener('install', (event) => {
  const cacheName = 'centry'
  const urls = ['centry.html','.img/logo.png']
  caches.open(cacheName).then(cache => {
    //cache.addAll(urls).then(() => {
      //done!
    //})
  })
  
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) { //entry found in cache
          return response
        }
        return fetch(event.request)
      }
    )
  )
})