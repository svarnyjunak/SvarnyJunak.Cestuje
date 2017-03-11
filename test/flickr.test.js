/* eslint-env node, mocha */
const chai = require("chai");

const expect = chai.expect;
const assert = chai.assert;
const flickr = require("../flickr.js");

describe("flickr", () => {
  describe(".test", () => {
    it("should be defined namespace", () => {
      expect(flickr).to.have.a.property("test");
    });

    describe(".echo(options)", () => {
      it("should return promise with request echo", (done) => {
        const options = {
          api_key: process.env.API_KEY,
          foo: "bar"
        };

        const echo = flickr.test.echo(options);
        echo.then((result) => {
          expect(result).to.have.a.property("foo");
          done();
        });

        echo.catch(console.log);
      });
    });
  });

  describe(".photos", () => {
    it("should be defined namespace", () => {
      expect(flickr).to.have.a.property("photos");
    });

    describe(".getSizes(options)", () => {
      it("should return promise with picture sizes", (done) => {
        const options = {
          api_key: process.env.API_KEY,
          photo_id: "2287530762"
        };

        flickr.photos.getSizes(options)
                .then((result) => {
                  expect(result).to.have.a.property("sizes");
                  expect(result.sizes).to.have.a.property("size");
                  done();
                })
                .catch(console.log);
      });
    });
  });

  describe(".photosets", () => {
    it("should be defined namespace", () => {
      expect(flickr).to.have.a.property("photosets");
    });

    describe(".getList(options)", () => {
      it("should return promise with list of photosets", (done) => {
        flickr.photosets.getList({ api_key: process.env.API_KEY, user_id: "23149896@N04" })
                .then((result) => {
                  expect(result).to.have.a.property("photosets");
                  expect(result.photosets).to.have.a.property("total");
                  assert(result.photosets.total > 0);
                  done();
                })
                .catch(console.log);
      });
    });

    describe(".getPhotos(options)", () => {
      it("should return promise with list of photos", (done) => {
        flickr.photosets.getPhotos({ api_key: process.env.API_KEY, user_id: "23149896@N04", photoset_id: "72157633600591942" })
                .then((result) => {
                  expect(result).to.have.a.property("photoset");
                  expect(result.photoset).to.have.a.property("photo");
                  done();
                })
                .catch(console.log);
      });
    });
  });
});
