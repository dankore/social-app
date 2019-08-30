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


module.exports = Comments
