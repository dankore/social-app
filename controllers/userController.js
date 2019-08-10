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
      res.send(result);
    })
    .catch(error => {
      res.send(error);
    });
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();

  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Congrats there no errors");
  }
};
exports.logout = () => {};
exports.home = (req, res) => {
  if (req.session.user) {
    res.send("Welcome to the actual app!");
  } else {
    res.render("home-guest");
  }
};
