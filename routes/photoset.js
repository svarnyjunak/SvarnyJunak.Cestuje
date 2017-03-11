const express = require("express");

const router = express.Router();
const maxPictureHeight = 333;

/* GET photoset page. */
router.get("/:id", (req, res) => {
  const error = message => e => res.status(500).send(message + " - " + e);

  const options = {
    api_key: req.flickrOptions.api_key,
    photoset_id: req.params.id,
    user_id: req.flickrOptions.user_id,
    extras: "url_m"
  };

  const callback = (data) => {
    data.userId = options.user_id;
    data.title = data.photoset.title;

    data.photoset.photo = data.photoset.photo.map(photo => ({
      id: photo.id,
      title: photo.title,
      url: photo.url_m,
      isLandscape: photo.width_m > photo.height_m,
      width: (photo.width_m * (maxPictureHeight / photo.height_m)).toFixed(0),
      height: maxPictureHeight,
      farm: photo.farm,
      server: photo.server,
      secret: photo.secret
    }));

    res.render("photoset", { model: data });
  };

  req.flickr.photosets.getPhotos(options)
                      .then(callback)
                      .catch(error("get photos"));
});

module.exports = router;
