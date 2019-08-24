const Post = require("../models/Post");
const Comments = require("../models/Comments");
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRIDAPIKEY)

exports.viewCreateScreen = function(req, res) {
  res.render("create-post");
};

exports.createComment = async (req, res) => {
  let comment = new Comments(req.body);
  await comment.create();
  res.redirect(`/post`);
};

exports.create = (req, res) => {
  let post = new Post(req.body, req.session.user._id);

  post
    .create()
    .then(newId => {
      sendgrid.send({
        to: "adamu.dankore@gmail.com",
        from: "adamu.dankore@gmail.com",
        subject: 'Congrats, you just created a new post!',
        text: 'You did a great job of creating a post',
        html: 'You did a <strong>great</strong> job creating a post on the GSS Gwarinpa Network!' // Use backticks to dynamically do stuff
      })
      req.flash("success", "New post successfully created.");
      req.session.save(() => res.redirect(`/post/${newId}`));
    })
    .catch(errors => {
      errors.forEach(error => req.flash("errors", error));
      req.session.save(() => res.redirect("/create-post"));
    });
};
exports.apiCreate = (req, res) => {
  let post = new Post(req.body, req.apiUser._id);

  post
    .create()
    .then(newId => {
      res.json("Congrats.")
    })
    .catch(errors => {
     res.json(errors)
    });
};

exports.viewSingle = async (req, res) => {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.render("single-post-screen", { post: post, title: post.title});
  } catch {
    res.render("404");
  }
};

exports.viewEditScreen = async function(req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    if (post.isVisitorOwner) {
      res.render("edit-post", { post: post });
    } else {
      req.flash("errors", "You do not have permission to perform that action.");
      req.session.save(() => res.redirect("/"));
    }
  } catch {
    res.render("404");
  }
};

exports.edit = (req, res) => {
  let post = new Post(req.body, req.visitorId, req.params.id);
  post
    .update()
    .then(status => {
      // The post was successfully updated in the database
      // or user did have permission, but there were validation errors
      if (status == "success") {
        // Post was udated in db
        req.flash("success", "Post successfully updated.");
        req.session.save(() => {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      } else {
        post.errors.forEach(error => {
          req.flash("errors", error);
        });
        req.session.save(() => {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      }
    })
    .catch(() => {
      // If a post with the requested does not exist
      // Or if the current visitor is not the owner of the requested post
      req.flash("errors", "You do not have permission to perform that action");
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.delete = (req, res) => {
  Post.delete(req.params.id, req.visitorId)
    .then(() => {
      req.flash("success", "Post successfully deleted.");
      req.session.save(() => {
        res.redirect(`/profile/${req.session.user.username}`);
      });
    })
    .catch(() => {
      req.flash("errors", "You do not have permission to perform that action");
      req.session.save(() => res.redirect("/"));
    });
};

exports.apiDelete = (req, res) => {
  Post.delete(req.params.id, req.apiUser._id)
    .then(() => {
      res.json("Success!")
    })
    .catch(() => {
      res.json("You do not have permission to perform that action.")
    });
};

exports.search = (req, res) => {
  Post.search(req.body.searchTerm)
    .then(posts => {
      res.json(posts);
    })
    .catch(() => {
      res.json([]);
    });
};
