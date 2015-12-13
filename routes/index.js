var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flickr.tokenOnly(req.flickrOptions, function(error, flickr) {
    flickr.photosets.getList(
      {
        api_key: req.flickrOptions.api_key,
        user_id: req.flickrOptions.user_id
      },
      function(err, result) {
        if(err) {
          console.log(err);
          throw err;
        }
        else {         
          var titleDoNotStartWithHastag = function(gallery) {
              return gallery.title._content.charAt(0) !== "#";
          }
          
          var photosets = result.photosets.photoset.filter(titleDoNotStartWithHastag);
          res.render('index', { photosets: photosets });
        }
      });
  });
});

module.exports = router;
