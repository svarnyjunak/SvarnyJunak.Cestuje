/* jshint node: true */

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
        result.userId = options.user_id;
        result.title = result.photoset.title;
        res.render('photoset', { model: result });
    };
    
    var error = function(e) {
        res.status(500).send(e);
    };
    
    req.flickr.photosets.getPhotos(options)
        .then(callback)
        .catch(error);
});

module.exports = router;
