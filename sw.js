const CACHE='boxing-coach-pro-v21-7-stable-skeleton';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const q=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',q));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const q=r.clone();caches.open(CACHE).then(x=>x.put(e.request,q));return r})));
});