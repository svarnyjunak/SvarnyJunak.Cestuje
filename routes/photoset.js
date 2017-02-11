/* jshint node: true */

const express = require('express');
const router = express.Router();
const maxPictureHeight = 333;

/* GET photoset page. */
router.get('/:id', function(req, res) {
    const error = e => res.status(500).send(e);
    
    const options = {
        api_key: req.flickrOptions.api_key,
        photoset_id: req.params.id,
        user_id: req.flickrOptions.user_id
    };

    const callback = function(data) {
        data.userId = options.user_id;
        data.title = data.photoset.title;

        var sizes = data.photoset.photo.map(function(photo) {
            return req.flickr.photos.getSizes({
                    api_key: req.flickrOptions.api_key,
                    photo_id: photo.id
                }).then(function(result) {
                    var mediumSize = result.sizes.size.find(s => s.label === 'Medium');
                    photo.url = mediumSize.source;
                    photo.isLandscape = mediumSize.width > mediumSize.height;
                    
                    photo.width = (mediumSize.width * (maxPictureHeight / mediumSize.height)).toFixed(0);
                    photo.height = maxPictureHeight;     
                }).catch(error);
        });

        Promise.all(sizes).then(function() {
            res.render('photoset', { model: data });
        })
        .catch(error);
    };

    req.flickr.photosets.getPhotos(options)
        .then(callback)
        .catch(error);
});

module.exports = router;
