let staticCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll([
				'/restaurant-review-app',
				'/restaurant-review-app/index.html',
				'/restaurant-review-app/restaurant.html',
				'/restaurant-review-app/css/styles.css',
				'main.js',
				'restaurant_info.js',
				'dbhelper.js',
				'/restaurant-review-app/data/restaurants.json'
			]);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheName => {
					return cacheName.startsWith('restaurant-') &&
								 cacheName != staticCacheName;
				}).map(cacheName => {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});
