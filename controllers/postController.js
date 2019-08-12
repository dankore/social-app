const Post = require("../models/Post");

exports.viewCreateScreen = function(req, res) {
  res.render("create-post");
};

exports.create = (req, res) => {
  let post = new Post(req.body, req.session.user._id);

  post
    .create()
    .then(() => {
      res.send("New post created.");
    })
    .catch(errors => {
      res.send(errors);
    });
};

exports.viewSingle = async (req, res) => {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.render("single-post-screen", { post: post });
  } catch {
    res.render("404");
  }
};


    exports.viewEditScreen = async (req, res) => {
      try {
        let post = await Post.findSingleById(req.params.id);
        res.render("edit-post", { post: post });

      } catch {
        res.render('404')
      }
    };
