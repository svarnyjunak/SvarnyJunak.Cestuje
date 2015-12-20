var expect = require('chai').expect;
var flickr = require('../flickr.js');

describe('flickr', function() {
   describe('.test', function() {
       it('should be defined namespace', function() {
           expect(flickr).to.have.a.property('test');
       });
       
       describe('.echo(options)', function () {
         it('result should return a request echo', function(done) {
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
});