const commentsCollection = require("../db")
  .db()
  .collection("comments");
const sanitizeHTML = require("sanitize-html");
const ObjectID = require("mongodb").ObjectID;
const User = require("./User");

let Comments = function(data){
  this.data  = data
  this.errors = []
}

Comments.prototype.create = function(){
return new Promise(async(resolve, reject)=>{
  let comment = await commentsCollection.insertOne(this.data);
  if(comment){resolve(comment)}else{(reject()}
  });
}

module.exports = Comments
