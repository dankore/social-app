const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const markdown = require("marked");
const MongoStore = require("connect-mongo")(session);
const csfr = require("csurf");
const app = express();
const sanitizeHTML = require("sanitize-html");

// Add user submit input to body of request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', require('./router-api'))

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
    return sanitizeHTML(markdown(content), {
      allowedTags: [
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "strong",
        "bold",
        "i",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6"
      ],
      allowedAttributes: {}
    });
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


// Make this app find files for the public eyes - e.g css
app.use(express.static("public"));
// Make this app find html files
app.set("views", "views-html"); // First arg must be views
app.set("view engine", "ejs");

app.use(csfr());

app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/", router);

app.use(function(err, req, res, next) {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      req.flash("errors", "Cross site request forgery detected.");
      req.session.save(() => res.redirect("/"));
    } else {
      res.render("404");
    }
  }
});

const server = require("http").createServer(app);

const io = require("socket.io")(server);

io.use((socket, next) => {
  sessionOptions(socket.request, socket.request.res, next);
});

io.on("connection", socket => {
  if (socket.request.session.user) {
    let user = socket.request.session.user;

    socket.emit("welcome", { username: user.username, avatar: user.avatar });

    socket.on("chatMessageFromBrowser", data => {
      // Braodcast to all
      socket.broadcast.emit("chatMessageFromServer", {
        message: sanitizeHTML(data.message, {
          allowedTags: [],
          allowedAttributes: {}
        }),
        username: user.username,
        avatar: user.avatar
      });
    });
  }
});

module.exports = server;
