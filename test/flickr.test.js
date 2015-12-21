var expect = require('chai').expect;
var flickr = require('../flickr.js');

/* jshint node: true */

describe('flickr', function() {
   describe('.test', function() {
       it('should be defined namespace', function() {
           expect(flickr).to.have.a.property('test');
       });
       
       describe('.echo(options)', function () {
         it('should load request echo', function(done) {
            var options = {
                api_key: process.env.API_KEY,
                foo: "bar"
            };
            
            flickr.test.echo(
              options, 
              function (result) {
                expect(result).to.have.a.property('foo');
                done(); 
              },
              console.log);
            });  
       });
   });
   
   describe('.photos', function () {
      it('should be defined namespace', function () {
        expect(flickr).to.have.a.property('photos');    
      });
      
      describe('.getSizes(options, callback, error)', function () {
        it('should load picture sizes', function (done) {
            var options = {
                api_key: process.env.API_KEY,
                photo_id: '2287530762'    
            };
            
            flickr.photos.getSizes(
                options,
                function (result) {
                    expect(result).to.have.a.property('sizes');
                    expect(result.sizes).to.have.a.property('size');
                    done();                    
                },
                console.log);
         });
      });    
   });
});