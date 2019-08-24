const commentsCollection = require("../db")
  .db()
.collection("comments");

let Comments = function(data){
  this.data = data;
}

Comments.prototype.create = function(){
  return new Promise((resolve, reject)=>{
  let comment commentsCollection.insertOne(this.data)
  if(data){resolve(data)}else{reject()}
  })
}


module.exports = Comments
