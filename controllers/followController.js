const Follow = require("../models/Follow");

exports.addFollow = (req, res) => {
  // Store the parameters needed into the function. We need the username
  // of the followed and the id of the follower
  // These params will eventually be passed into the Follow.js file
  let follow = new Follow(req.params.username, req.visitorId);
  follow
    .create()
    .then(() => {
      req.flash("success", `Successfully followed ${req.params.username}`);
      req.session.save(() => res.redirect(`/profile/${req.params.username}`));
    })
    .catch(errors => {
      errors.forEach((error) => {
        req.flash("errors", error);
      });
      req.session.save(() => res.redirect("/"));
    });
};

exports.removeFollow = (req, res) => {
  // Store the parameters needed into the function. We need the username
  // of the followed and the id of the follower
  // These params will eventually be passed into the Follow.js file
  let follow = new Follow(req.params.username, req.visitorId);
  follow
    .delete()
    .then(() => {
      req.flash(
        "success",
        `Successfully stopped following ${req.params.username}`
      );
      req.session.save(() => res.redirect(`/profile/${req.params.username}`));
    })
    .catch(errors => {
      errors.forEach(() => {
        req.flash("errors", error);
      });
      req.session.save(() => res.redirect("/"));
    });
};
