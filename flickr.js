/* jshint node: true */

var https = require('https');
var flickrUrl = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=?';
var getFlickrUrl = function(method, options) {
    var url = flickrUrl + "&method=" + method;
    
    for(var option in options) {
        if (options.hasOwnProperty(option)) {
            url += '&' + option + '=' + options[option];
        }        
    }
    
    return url;
};

var callFlickr = function(method, options) {
    return new Promise(function(resolve, reject) {
        var url = getFlickrUrl(method, options);
        https.get(url, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                var parsed = JSON.parse(body);
                resolve(parsed);
            });
            response.on('error', function(err) {
                reject(err);
            });
        });
    });
};

module.exports = {
    photos: {
        getSizes: function (options) {
            return callFlickr('flickr.photos.getSizes', options);    
        },    
    },
    photosets: {
        getList: function (options) {
            return callFlickr('flickr.photosets.getList', options);
        },
        getPhotos: function(options) {
            return callFlickr('flickr.photosets.getPhotos', options);    
        },
    },
    test : {
        echo: function(options) {
            return callFlickr('flickr.test.echo', options);
        }
    }
};