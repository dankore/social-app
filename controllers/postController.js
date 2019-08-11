const Post = require("../models/Post");

exports.viewCreateScreen = function(req, res) {
  res.render("create-post");
};
exports.create = (req, res) => {
  let post = new Post(req.body);

  post
    .create()
    .then(() => {
      res.send("New post created.");
    })
    .catch(errors => {
      res.send(errors);
    });
};
