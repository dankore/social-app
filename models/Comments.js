const commentsCollection = require("../db")
  .db()
.collection("comments");
const Post = require("./Post");

let Comments = function(data){
  this.data = data;
}

Comments.prototype.create = (postIdToAssociate) => {
  return new Promise(async (resolve, reject)=>{
    try {
      let postId = await Post.findSingleById();
      let comment = commentsCollection.insertOne(this.data)
      
      console.log(postId)
      if(comment){resolve(comment)}else{reject()}
    } catch {
      reject()
    }
  
  })
}


module.exports = Comments
