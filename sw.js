"use strict";

// New

var projectsCacheName = 'projectsCachev1';
var projectCacheImagesName = 'projectsCacheImagesv2';

var projectsCacheFiles = [
    'js/app.js',
    'js/projectService.js',
    'js/clientStorage.js',
    'swRegister.js',
    'js/template.js',
    './',
    'resources/es6-promise/es6-promise.js',
    'resources/fetch/fetch.js',
    'resources/localforage/localforage.min.js',
    'resources/localforage/localforage-getitems.js',
    'resources/localforage/localforage-setitems.js',
    'resources/material-design-light/material.min.js',
    'resources/material-design-light/material.min.js.map',
    'resources/material-design-light/material.red-indigo.min.css',
    'resources/systemjs/system.js',
    'resources/systemjs/system-polyfills.js'
];
var projectsPath = 'http://cmgt.hr.nl:8000/api/projects/';


self.addEventListener('install', function (event) {
    console.log('From SW: Install Event:', event);
    self.skipWaiting();
    event.waitUntil(
        caches.open(projectsCacheName)
            .then(function (cache) {
                return cache.addAll(projectsCacheFiles);
            })
    )
});

self.addEventListener('activate', function (event) {
   console.log('from SW: Activate State', event);
   self.clients.claim();
   event.waitUntil(
       caches.keys()
           .then(function (cacheKeys) {
               var deletePromises = [];
               for(var i = 0; i < cacheKeys.length; i++ ){
                   if(cacheKeys[i] != projectsCacheName &&
                      cacheKeys[i] != projectCacheImagesName){
                       deletePromises.push(caches.delete(cacheKeys[i]));
                   }
               }
               return Promise.all(deletePromises);
           }).catch(function (error) {
           console.log('Er is een error: ', error)
       })
   )
});

self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url);
    var requestPath = requestUrl.pathname;
    var fileName = requestPath.substring(requestPath.lastIndexOf('/') + 1);




    if (navigator.onLine) {
        event.respondWith(fetch(event.request));

    }else if(requestPath == projectsPath  || fileName == 'sw.js'){
        event.respondWith(networkFirstStrategy(event.request))

    } else {
        console.log('ik ben offline');
        event.respondWith(cacheFirstStrategy(event.request))

    }

});

function networkFirstStrategy(request){
    return fetchRequestAndCache(request).catch(function (response) {
        return caches.match(request);
    })
}

function cacheFirstStrategy(request){
    return caches.match(request).then(function (cacheResponse) {
        return cacheResponse || fetchRequestAndCache(request);
    })
}

function fetchRequestAndCache(request) {
    return fetch(request).then(function (networkResponse) {
        caches.open(getCacheName(request)).then(function (cache) {
            cache.put(request, networkResponse);
        });
        return networkResponse.clone();
    }).catch(function (error) {
        console.log('Er is een error: ', error)
    })
}



function getCacheName(request){
    var requestUrl = new URL(request.url);
    var requestPath = requestUrl.pathname;

        return projectsCacheName;
}





