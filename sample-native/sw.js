'use strict';

var CACHE_NAME = 'v2',
	cacheUrls = [
		'https://code.jquery.com/jquery-3.1.1.min.js',
		'https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.css',
		'https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.js',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/sw.js',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/index.html',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/favicon.ico',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/manifest.json',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-16-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-24-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-32-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-48-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-57-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-64-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-72-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-114-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-120-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-144-192401.png',
		'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-native/imgs/calculator-icon-152-192401.png',
		'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin',
		'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff',
		'https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff',
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
	event.respondWith(
		caches
			.match(event.request)
			.then(function (cachedResponse) {
				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(event.request);
			})
	);
});
