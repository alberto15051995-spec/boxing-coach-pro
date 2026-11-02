const CACHE='boxing-coach-pro-v21-3-dynamic';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&e.request.mode==='navigate')e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./index.html')))})
