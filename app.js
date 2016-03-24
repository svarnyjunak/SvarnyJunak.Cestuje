/* global __dirname */
/* global process */
/* jshint node: true */

var express = require('express');
var compress = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flickrOptions = {
    api_key: process.env.API_KEY,
    user_id: process.env.USER_ID
};

var flickr = require('./flickr');

var routes = require('./routes/index');
var photoset = require('./routes/photoset');
var users = require('./routes/users');

var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.flickr = flickr;
    req.flickrOptions = flickrOptions;
    next();
});

// apply content security policy
app.use(function(req, res, next){
    var csp = "default-src 'self'; script-src 'self' *.google-analytics.com; object-src 'none'; img-src 'self' *.static.flickr.com *.google-analytics.com stats.g.doubleclick.net;media-src; frame-src 'none'";
    if(app.get('env') === 'development') {
        csp = csp + "; connect-src 'self' ws://127.0.0.1:35729/livereload;";
    }
    
    console.log(csp);
    res.header("Content-Security-Policy", csp);
    next();
});

app.use('/', routes);
app.use('/photoset', photoset);
app.use('/users', users);

// catch 404 and show static page.
app.use(function(req, res) {
    res.status(404);
    res.sendFile(__dirname  + '/public/404.html');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
