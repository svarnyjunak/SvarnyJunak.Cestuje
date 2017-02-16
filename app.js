const http = require("http");
const express = require("express");
const compress = require("compression");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const flickr = require("./flickr");
const routes = require("./routes/index");
const photoset = require("./routes/photoset");

const isProduction = () => process.env.NODE_ENV === "production";
const flickrOptions = {
  api_key: process.env.API_KEY,
  user_id: process.env.USER_ID
};

const port = process.env.PORT || "3000";
const app = express();
app.set("port", port);
app.use(helmet({
  hsts: {
    maxAge: 15552001,
    includeSubDomains: true,
    preload: true,
    setIf: isProduction
  } })
);

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "*.google-analytics.com"],
    imgSrc: ["'self'", "https://*.static.flickr.com", "https://*.staticflickr.com", "http://*.google-analytics.com", "https://*.google-analytics.com", "https://stats.g.doubleclick.net"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    childSrc: ["'none'"]
  }
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  req.flickr = flickr;
  req.flickrOptions = flickrOptions;
  next();
});
app.use("/", routes);
app.use("/photoset", photoset);

// catch 404 and show static page.
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "/public/404.html"));
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === "development") {
  app.use((err, req, res) => {
    console.log(err);
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

// start server
const server = http.createServer(app);
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
  case "EACCES":
    console.error(`port ${port} requires elevated privileges`);
    process.exit(1);
    break;
  case "EADDRINUSE":
    console.error(`port ${port} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
});
server.on("listening", () => {
  console.log(`app started started Listening on port ${port}`);
});
server.listen(port);
