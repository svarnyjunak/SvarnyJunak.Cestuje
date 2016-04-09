/* jshint node: true */

var express = require('express');
var router = express.Router();

/* GET list of photosets page. */
router.get('/', function(req, res, next) {
    var options = {
        api_key: req.flickrOptions.api_key,
        user_id: req.flickrOptions.user_id
    };
    
    var callback = function(result) {        
        var titleDoNotStartWithHastag = gallery => gallery.title._content.charAt(0) !== "#";          
        var photosets = result.photosets.photoset.filter(titleDoNotStartWithHastag);
        res.render('index', {model: { photosets: photosets }});
    };
    
    var error = function(e) {
        res.status(500).send(e);
    };
       
    req.flickr.photosets.getList(options)
        .then(callback)
        .catch(error);
});

module.exports = router;
