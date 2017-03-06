const express = require("express");

const router = express.Router();
const maxPictureHeight = 333;

/* GET photoset page. */
router.get("/:id", (req, res) => {
  const error = message => e => res.status(500).send(message + " - " + e);

  const options = {
    api_key: req.flickrOptions.api_key,
    photoset_id: req.params.id,
    user_id: req.flickrOptions.user_id
  };

  const callback = (data) => {
    data.userId = options.user_id;
    data.title = data.photoset.title;

    const sizes = data.photoset.photo.map(photo => req.flickr.photos.getSizes({
      api_key: req.flickrOptions.api_key,
      photo_id: photo.id
    }).then((result) => {
      const mediumSize = result.sizes.size.find(s => s.label === "Medium");
      photo.url = mediumSize.source;
      photo.isLandscape = mediumSize.width > mediumSize.height;

      photo.width = (mediumSize.width * (maxPictureHeight / mediumSize.height)).toFixed(0);
      photo.height = maxPictureHeight;
    }).catch(error("get size")));

    Promise.all(sizes).then(() => {
      res.render("photoset", { model: data });
    }).catch(error);
  };

  req.flickr.photosets.getPhotos(options)
                      .then(callback)
                      .catch(error("get photos"));
});

module.exports = router;
