var express = require('express');
var router = express.Router();

/* GET photoset page. */
router.get('/:id', function(req, res, next) {
  req.flickr.tokenOnly(req.flickrOptions, function(error, flickr) {
    flickr.photosets.getPhotos(
      {
        api_key: req.flickrOptions.api_key,
        photoset_id: req.params.id,
        user_id: req.flickrOptions.user_id
      },
      function(err, result) {
        res.render('photoset', { model: result });
      });
  });
});

module.exports = router;
