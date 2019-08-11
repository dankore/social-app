//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

exports.mustBeLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash("errors", " You must be logged in to perform that action");
    req.session.save(() => {
      res.redirect("/");
    });
  }
};

// Import User Model
const User = require("../models/User");

exports.login = (req, res) => {
  //Create an instance of User object
  // And look into the body of the form => req.body for submissions
  let user = new User(req.body);
  user
    .login()
    .then(result => {
      req.session.user = {
        avatar: user.avatar,
        username: user.data.username,
        _id: user.data._id
      };
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch(error => {
      // Flash is accessing this => req.session.flash.errors = [errors]
      req.flash("errors", error);
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.register = function(req, res) {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      req.session.user = {
        username: user.data.username,
        avatar: user.avatar,
        _id: user.data._id
      };
      req.session.save(function() {
        res.redirect("/");
      });
    })
    .catch(regErrors => {
      regErrors.forEach(function(error) {
        req.flash("regErrors", error);
      });
      req.session.save(function() {
        res.redirect("/");
      });
    });
};
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.home = (req, res) => {
  if (req.session.user) {
    res.render("home-dashboard");
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      regErrors: req.flash("regErrors")
    });
  }
};

exports.ifUserExists = (req, res, next) => {
  User.findByUserName(req.params.username)
    .then(userDocument => {
      req.profileUser = userDocument;
      next();
    })
    .catch(() => {
      res.render("404");
    });
};

exports.profilePostsScreen = (req, res) => {
  res.render("profile");
};
