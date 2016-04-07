var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var flickr = require('../flickr.js');

/* jshint node: true */

describe('flickr', function() {
   describe('.test', function() {
       it('should be defined namespace', function() {
           expect(flickr).to.have.a.property('test');
       });
       
       describe('.echo(options)', function () {
          it('should return promise with request echo', function (done) {
               var options = {
                api_key: process.env.API_KEY,
                foo: "bar"
            };
            
            var echo = flickr.test.echo(options);
            echo.then(function(result) {                
                expect(result).to.have.a.property('foo');
                done();
            });
            
            echo.catch(console.log);
          });
       });
   });
   
   describe('.photos', function () {
      it('should be defined namespace', function () {
        expect(flickr).to.have.a.property('photos');    
      });
      
      describe('.getSizes(options)', function () {
        it('should return promise with picture sizes', function (done) {
            var options = {
                api_key: process.env.API_KEY,
                photo_id: '2287530762'    
            };
            
            flickr.photos.getSizes(options)
                .then(function(result) {
                    expect(result).to.have.a.property('sizes');
                    expect(result.sizes).to.have.a.property('size');
                    done();
                })
                .catch(console.log);
         });
      });
   });
   
   describe('.photosets', function () {
      it('should be defined namespace', function () {
        expect(flickr).to.have.a.property('photosets');    
      });
      
      describe('.getList(options)', function () {
          it('should return promise with list of photosets', function(done) {
              flickr.photosets.getList({api_key: process.env.API_KEY, user_id: '23149896@N04'})
                .then(function(result) {
                    expect(result).to.have.a.property('photosets');
                    expect(result.photosets).to.have.a.property('total');
                    assert(result.photosets.total > 0);
                    done();  
                })
                .catch(console.log);
          });
      });
      
      describe('.getPhotos(options)', function() {
         it('should return promise with list of photos', function(done) {
            flickr.photosets.getPhotos({api_key: process.env.API_KEY, user_id: '23149896@N04', photoset_id: '72157633600591942'})
                .then(function(result) {
                    expect(result).to.have.a.property('photoset');
                    expect(result.photoset).to.have.a.property('photo');
                    done();
                })  
                .catch(console.log);  
         });
      });
   });
});