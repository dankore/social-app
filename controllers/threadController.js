const Thread = require("../models/Thread");
const Post = require("../models/Post");
const User = require("../models/User");

exports.show = async function(req, res) {
  // fetch feed of threads for current user
  try {
     let user = new User(req.body);
    let threadz = await Thread.find(user.data._id);
    res.render("thread", { threads: threadz });
  } catch {
    res.send("Problem from threadController show fn.");
  }
};

exports.create = (req, res) => {
  let thread = new Thread(req.body, req.session.user._id);
  thread
    .create()
    .then(() => {
      req.session.save(() => res.redirect("thread"));
    })
    .catch(errors => {
      errors.forEach(error => req.flash("errors", error));
      req.session.save(() => res.redirect("/thread"));
    });
};
