'use strict';

var CACHE_NAME = 'v1',
	MAX_AGE = 3600000,
	cacheUrls = [
		'/'
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
		return caches.match(event.request)
			.then(function (cachedResponse) {
				var doUpdate = false;
				var lastModified, fetchRequest;

				if (cachedResponse) {
					lastModified = new Date(cachedResponse.headers.get('last-modified'));
					if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
						doUpdate = true;
					}
				} else {
					doUpdate = true;
				}

				if (doUpdate) {
					fetchRequest = event.request.clone();
					return fetch(fetchRequest)
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
				} else {
					return cachedResponse;
				}
			})
	})());
});
