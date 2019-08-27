const Thread = require("../models/Thread");
// var scrollToElement = require("scroll-to-element");


exports.show = async function(req, res) {
  try {
    let threadz = await Thread.find();
    res.render("thread", { threads: threadz });
  } catch {}
};

exports.create = (req, res) => {
  let thread = new Thread(req.body);
  thread
    .create()
    .then(() => {
    //   res.redirect("/thread");
      req.session.save(() => res.redirect('thread'));
    })
    .catch((errors) => {
    errors.forEach(error => req.flash("errors", error));
    req.session.save(() => res.redirect("/thread"));
    });
};
