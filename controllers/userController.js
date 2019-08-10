//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

// Import User Model
const User = require("../models/User");

exports.login = (req, res) => {
  //Create an instance of User object
  // And look into the body of the form => req.body for submissions
  let user = new User(req.body);
  user
    .login()
    .then(result => {
      req.session.user = { favColor: "red", username: user.data.username };
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
      req.session.user = { username: user.data.username };
      req.session.save(function() {
        res.redirect("/");
      });
    })
    .catch(regErrors => {
      regErrors.forEach(function (error) {
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
    res.render("home-dashboard", { username: req.session.user.username });
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      regErrors: req.flash("regErrors")
    });
  }
};
