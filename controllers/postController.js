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

exports.viewSingle = (req, res)=>{
  res.render('single-post-screen')
}
