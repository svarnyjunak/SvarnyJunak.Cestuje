var express = require('express');
var router = express.Router();

/* GET photoset page. */
router.get('/:id', function(req, res, next) {
    var options = {
        api_key: req.flickrOptions.api_key,
        photoset_id: req.params.id,
        user_id: req.flickrOptions.user_id
    };    
    
    var callback = function(result) {
        res.render('photoset', { model: result });
    };
    
    var error = function(e) {
        res.status(500).send(e);
    }
    
    req.flickr.photosets.getPhotos(options, callback, error);
});

module.exports = router;
