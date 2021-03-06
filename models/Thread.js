const threadCollection = require("../db")
  .db()
  .collection("thread2");
const sanitizeHTML = require("sanitize-html");
const ObjectID = require("mongodb").ObjectID;
const User = require("./User");



let Thread = function(data, userid) {
  this.data = data;
  this.userid = userid;
  this.errors = [];
};

Thread.prototype.cleanUp = function(req, res) {
  if (typeof this.data.thread != "string") {
    this.data.thread = "";
  }

  // get rid of any bogus properties
  this.data = {
    thread: sanitizeHTML(this.data.thread.trim(), {
      allowedTags: [],
      allowedAttributes: {}
    }),
    createdDate: new Date(),
    author: ObjectID(this.userid)
  };
};

Thread.prototype.validate = function() {
  if (this.data.thread == "") {
    this.errors.push("Body of message cannot be empty.");
  }
};

Thread.prototype.create = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await threadCollection
        .insertOne(this.data)
        .then(thread => {
          resolve(thread.ops);
        })
        .catch(() => {
         this.errors.push("Please try again later.");
         reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};


Thread.find = function(id, visitorId) {
return new Promise(async (resolve, reject) => {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject();
      return;
    }
    let threads = await threadCollection
      .aggregate([
        { $match: { } },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDocument"
          }
        },
        {
          $project: {
            thread: 1,
            createdDate: 1,
             authorId: "$author",
            author: { $arrayElemAt: ["$authorDocument", 0] }
          }
        }
      ])
      .toArray();
    // Cleanup author property in each thread object
    threads = threads.map(function(thread) {
      thread.isVisitorOwner = thread.authorId.equals(id);
      thread.authorId = undefined;
      thread.author = {
        username: thread.author.username,
        avatar: new User(thread.author, true).avatar
      };
      return thread;
    });
    resolve(threads);
  })
}


Thread.delete = (threadIdToDelete, currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
        let threads = await Thread.find(currentUserId);
        threads.map(async thread =>{
        if (thread.isVisitorOwner) {
            await threadCollection.deleteOne({ _id: new ObjectID(threadIdToDelete) });
            resolve();
        }})
      } catch {
        reject();
      }
  });
};

Thread.edit = (textareaContent, threadIdToEdit, currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
        let threads = await Thread.find(currentUserId);
        threads.map(async thread =>{
        if (thread.isVisitorOwner) {
        await threadCollection.findOneAndUpdate(
        { _id: new ObjectID(threadIdToEdit) },
        { $set: { thread: textareaContent.thread } });
            resolve("success");
        }})
      } catch {
        reject();
      }
  });
};


module.exports = Thread;
