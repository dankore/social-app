const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const markdown = require("marked");
const MongoStore = require("connect-mongo")(session);
const app = express();

let sessionOptions = session({
  secret: "JavaScript is sooooo cool",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.use((req, res, next) => {
  // Make our markdown function available from within ejs templates
  res.locals.filterUserHTML = function(content) {
    return markdown(content);
  };
  // Make all error and success flash messsages available from all templates
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  // Make current user id available on the req object
  if (req.session.user) {
    req.visitorId = req.session.user._id;
  } else {
    req.visitorId = 0;
  }
  // Make suer session data from within view template
  res.locals.user = req.session.user;
  next();
});

const router = require("./router");

// Add user submit input to body of request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Make this app find files for the public eyes - e.g css
app.use(express.static("public"));
// Make this app find html files
app.set("views", "views-html"); // First arg must be views
app.set("view engine", "ejs");

app.use("/", router);
module.exports = app;
