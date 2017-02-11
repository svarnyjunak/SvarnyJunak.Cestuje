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
var helmet = require('helmet');
var flickrOptions = {
    api_key: process.env.API_KEY,
    user_id: process.env.USER_ID
};

var flickr = require('./flickr');

var routes = require('./routes/index');
var photoset = require('./routes/photoset');

var app = express();
app.use(helmet())
app.use(helmet.hsts({
  maxAge: 10886400,
  includeSubDomains: true,
  preload: true
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", '*.google-analytics.com'],
    objectSrc: ["'none'"],
    imgSrc: ["'self'", 'https://*.static.flickr.com', 'https://*.staticflickr.com', 'http://*.google-analytics.com', 'https://*.google-analytics.com', 'https://stats.g.doubleclick.net'],
    styleSrc: ["'self'", "'unsafe-inline'"],
    frameSrc: ["'none"],
  }
}));

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
app.use('/', routes);
app.use('/photoset', photoset);

// catch 404 and show static page.
app.use(function(req, res) {
    res.status(404);
    res.sendFile(__dirname  + '/public/404.html');
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
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
