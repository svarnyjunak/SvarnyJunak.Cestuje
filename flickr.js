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

var callFlickr = function(method, options, callback, error) {
    var url = getFlickrUrl(method, options);
    
    return https.get(url, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    }).on('error', function(e) {
        error(e);
    });
};

module.exports = {
    photos: {
        getSizes: function (options, callback, error) {
            return callFlickr('flickr.photos.getSizes', options, callback, error);    
        },    
    },
    photosets: {
        getList: function (options, callback, error) {
            return callFlickr('flickr.photosets.getList', options, callback, error);
        },
        getPhotos: function(options, callback, error) {
            return callFlickr('flickr.photosets.getPhotos', options, callback, error);    
        },
    },
    test : {
        echo: function(options, callback, error) {
            return callFlickr('flickr.test.echo', options, callback, error);
        }
    }
};