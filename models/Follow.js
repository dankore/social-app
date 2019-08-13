const usersCollection = require("../db")
  .db()
  .collection("users");
const followedCollection = require("../db")
  .db()
  .collection("follows");

const ObjectID = require("mongodb").ObjectID;

let Follow = function(followedUsername, authorId) {
  this.followedUsername = followedUsername;
  this.authorId = authorId;
  this.errors = [];
};
Follow.prototype.cleanUp = function() {
  if (typeof this.followedUsername != "string") {
    this.followedUsername = "";
  }
};
Follow.prototype.validate = async function() {
  // Followed username must exist in db
  let followedAccount = await usersCollection.findOne({
    username: this.followedUsername
  });
  if (followedAccount) {
    this.followedId = followedAccount._id;
  } else {
    this.errors.push("You cannot follow a user that does not exist.");
  }
};

Follow.prototype.create = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate();
    if (!this.errors.length) {
      await followedCollection.insertOne({
        folllowedId: this.folllowedId,
        authorId: new ObjectID(this.authorId)
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

Follow.isVisitorFollowing = async function(followedId, visitorId) {
  let followDoc = await followedCollection.findOne({
    followedId: followedId,
    authorId: new ObjectID(visitorId)
  });
  if (followDoc) {
    return true;
  } else {
    return false;
  }
};

module.exports = Follow;
