var express = require('express');
var router = express.Router();

/* GET list of photosets page. */
router.get('/', function(req, res, next) {
    var options = {
        api_key: req.flickrOptions.api_key,
        user_id: req.flickrOptions.user_id
    };
    
    var callback = function(result) {        
        var titleDoNotStartWithHastag = function(gallery) {
            return gallery.title._content.charAt(0) !== "#";
        }
          
        var photosets = result.photosets.photoset.filter(titleDoNotStartWithHastag);
        res.render('index', { photosets: photosets });
    };
    
    var error = function(e) {
        res.status(500).send(e);
    };
       
    req.flickr.photosets.getList(options, callback, error);
});

module.exports = router;
