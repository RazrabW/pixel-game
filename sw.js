const CACHE_NAME = 'your-super-game-name-v1.0.3';
const cacheList = [ // ресурсв которые бросаем в кэш
	'/', //обязательно
    'index.html',
    'js/index.js',
    'js/vue.min.js',
    'css/simple-grid.min.css'
];

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        })
    );
});

const CACHE_PREFIX = 'your-super-game-name';

this.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

this.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0
    ) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});