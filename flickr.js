const https = require("https");

const flickrUrl = "https://api.flickr.com/services/rest/?format=json&nojsoncallback=?";
function getFlickrUrl(method, options) {
  let url = `${flickrUrl}&method=${method}`;

  for (const option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      url += `&${option}=${options[option]}`;
    }
  }

  return url;
}

function callFlickr(method, options) {
  return new Promise((resolve, reject) => {
    const url = getFlickrUrl(method, options);
    console.log(url);
    https.get(url, (response) => {
      let body = "";
      response.on("data", (d) => {
        body += d;
      });
      response.on("end", () => {
        const parsed = JSON.parse(body);
        resolve(parsed);
      });
      response.on("error", (err) => {
        reject(err);
      });
    });
  });
}

module.exports = {
  photos: {
    getSizes: options => callFlickr("flickr.photos.getSizes", options)
  },
  photosets: {
    getList: options => callFlickr("flickr.photosets.getList", options),
    getPhotos: options => callFlickr("flickr.photosets.getPhotos", options)
  },
  test: {
    echo: options => callFlickr("flickr.test.echo", options)
  }
};
