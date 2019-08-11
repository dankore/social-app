let Post = data => {
  this.data = data;
};
Post.prototype.cleanUp = () => {
  if (typeof this.data.title != "string") {
    this.data.title = "";
    if (typeof this.data.body != "string") {
      this.data.body = "";
    }

    // Get rid of any bogus property
    this.data = {
      title: this.data.title.trim(),
      body: this.data.body.trim(),
      createdDate: new Date()
    };
  }
};
Post.prototype.validate = () => {};
Post.prototype.create = () => {};

module.exports = Post;
