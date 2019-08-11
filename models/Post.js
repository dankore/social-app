// Constructor function
let Post = data => {
  this.data = data;
  this.errors = []
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
Post.prototype.validate = () => {
    if(this.data.title == ""){
        this.errors.push("You must provide a title")        
    }
     if (this.data.body == "") {
       this.errors.push("You must provide a post content");
     }
};
Post.prototype.create = () => {};

module.exports = Post;
