const Thread = require("../models/Thread");
const Post = require("../models/Post");
const User = require("../models/User");

exports.down = function(req, res){
  res.render('down')
}

exports.show = async function(req, res) {
  // fetch feed of threads for current user
  try {
    let threadz = await Thread.find(req.session.user._id);
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
      req.session.save(() => res.redirect("threads"));
    })
    .catch(errors => {
      errors.forEach(error => req.flash("errors", error));
      req.session.save(() => res.redirect("/threads"));
    });
};

exports.delete1 = (req, res)=>{
    // console.log(req.body.threadId);
        Thread.delete(req.body.threadId, req.visitorId)
          .then(() => {
            req.session.save(() => res.redirect("/threads"));
          })
          .catch(() => {
            req.flash(
              "errors",
              "You do not have permission to perform that action"
            );
            req.session.save(() => res.redirect("/threads"));
          });
}


