const routes = [
  { key: "/2009/12/slovinsko-julske-alpy.html", value: "/photoset/72157633600800864" },
  { key: "/2012/08/ukrajina-krym.html", value: "/photoset/72157633601035728" },
  { key: "/2009/12/novy-zeland-tongariro.html", value: "/photoset/72157659991487334" },
  { key: "/2009/12/zajezd-na-ceste.html", value: "/photoset/72157633601146972" },
  { key: "/2009/12/novy-zeland-akaroa.html", value: "/photoset/72157659990477654" },
  { key: "/2009/12/novy-zeland-heaphy-track.html", value: "/photoset/72157662343519115" },
  { key: "/2009/12/novy-zeland-kepler-track.html", value: "/photoset/72157661749964150" },
  { key: "/2009/12/novy-zeland-okarei-korako.html", value: "/photoset/72157662192800371" },
  { key: "/2009/12/novy-zeland-wangapeka-track.html", value: "/photoset/72157659991808674" },
  { key: "/2009/12/novy-zeland-christchurch.html", value: "/photoset/72157633637971782" },
  { key: "/2009/12/novy-zeland-new-brighton-plaz.html", value: "/photoset/72157661627399909" }
];

function redirectOldRoute(req, res, next) {
  const currentPath = req.path.toLowerCase();
  const corespondingRoute = routes.find(r => currentPath.startsWith(r.key));
  if (corespondingRoute) {
    res.redirect(301, corespondingRoute.value);
  } else {
    next();
  }
}

module.exports = redirectOldRoute;
