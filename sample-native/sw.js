'use strict';

var CACHE_NAME = 'v1',
	cacheUrls = [
		'index.html',
	];

self.addEventListener('install', function (event) {
	console.log('install', event);
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(cacheUrls);
		})
	);
});

self.addEventListener('activate', function (event) {
	console.log('activate', event);
});

self.addEventListener('fetch', function (event) {
	event.respondWith((function () {
		return caches
			.match(event.request)
			.then(function (cachedResponse) {
				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(event.request)
					.then(function (response) {
						if (!response || response.status !== 200) {
							return cachedResponse;
						}
						var clonedResponse = response.clone();
						caches.open(CACHE_NAME).then(function (cache) {
							cache.put(event.request, response.clone());
						});
						return clonedResponse;
					})
					.catch(function () {
						return cachedResponse;
					});
			})
	})());
});
