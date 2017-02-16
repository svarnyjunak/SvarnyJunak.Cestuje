const express = require("express");

const router = express.Router();

/* GET list of photosets page. */
router.get("/", (req, res) => {
  const options = {
    api_key: req.flickrOptions.api_key,
    user_id: req.flickrOptions.user_id
  };

  const callback = (result) => {
    const titleDoNotStartWithHastag = gallery => gallery.title._content.charAt(0) !== "#";
    const photosets = result.photosets.photoset.filter(titleDoNotStartWithHastag);
    res.render("index", { model: { photosets } });
  };

  const error = (e) => {
    console.error(e);
    res.status(500).send(e);
  };

  req.flickr.photosets.getList(options)
        .then(callback)
        .catch(error);
});

module.exports = router;
