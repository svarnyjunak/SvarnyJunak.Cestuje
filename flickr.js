var https = require('https');
//var url = 'https://api.flickr.com/services/rest/?format=json&method=flickr.test.echo&name=value&api_key=eb9e976333304c9a78a1b9a7fd7da61b';
var flickrUrl = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=?';
var getFlickrUrl = function(method, options) {
    var url = flickrUrl + "&method=" + method;
    
    for(var option in options) {
        url += '&' + option + '=' + options[option];        
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
    photosets: {
        getList: function (options, callback, error) {
            return callFlickr('flickr.photosets.getList', options, callback, error);
        },
        getPhotos: function(options, callback, error) {
            return callFlickr('flickr.photosets.getPhotos', options, callback, error);    
        },
    }
};