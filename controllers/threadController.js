const Thread = require("../models/Thread");
const Post = require("../models/Post");

// exports.show = async function(req, res) {
// // console.log(req.session.user._id);
//   try {
//     let threadz = await Thread.find(req.session.user._id);
//     // console.log(threadz);
//     res.render("thread", { threads: threadz });
//   } catch {
//       res.send('Issues showing thread.')
//   }
// };

exports.show = async function(req, res) {
  // fetch feed of posts for current user
  try {
    let threadz = await Thread.find(req.session.user._id);
    console.log(threadz);
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
