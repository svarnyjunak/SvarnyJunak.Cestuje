"use strict";
/* jshint node: true */

const https = require('https');
const flickrUrl = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=?';
function getFlickrUrl(method, options) {
    let url = flickrUrl + "&method=" + method;
    
    for(let option in options) {
        if (options.hasOwnProperty(option)) {
            url += '&' + option + '=' + options[option];
        }        
    }
    
    return url;
}

function callFlickr(method, options) {
    return new Promise(function(resolve, reject) {
        const url = getFlickrUrl(method, options);
        https.get(url, function(response) {
            let body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                const parsed = JSON.parse(body);
                resolve(parsed);
            });
            response.on('error', function(err) {
                reject(err);
            });
        });
    });
}

module.exports = {
    photos: {
        getSizes: options => callFlickr('flickr.photos.getSizes', options),    
    },
    photosets: {
        getList: options => callFlickr('flickr.photosets.getList', options),
        getPhotos: options => callFlickr('flickr.photosets.getPhotos', options),
    },
    test : {
        echo: options => callFlickr('flickr.test.echo', options)
    }
};