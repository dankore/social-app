const Thread = require("../models/Thread");
// var scrollToElement = require("scroll-to-element");


exports.show = async function(req, res) {
  try {
    let threadz = await Thread.find();
    // console.log(threadz[10].createdDate)
    res.render("thread", { threads: threadz });
  } catch {
      res.send('Issues showing thread.')
  }
};

exports.create = (req, res) => {
  let thread = new Thread(req.body);
  thread
    .create()
    .then(() => {
      req.session.save(() => res.redirect('thread'));
    })
    .catch((errors) => {
    errors.forEach(error => req.flash("errors", error));
    req.session.save(() => res.redirect("/thread"));
    });
};
