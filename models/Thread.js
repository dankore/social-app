const threadCollection = require("../db")
  .db()
  .collection("thread2");
const sanitizeHTML = require("sanitize-html");
const ObjectID = require("mongodb").ObjectID;
const User = require("./User");



let Thread = function(data, userid) {
  this.data = data;
  this.userid = userid
  this.errors = [];
};

Thread.prototype.cleanUp = function() {
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

Thread.find = function() {
  return new Promise(async (resolve, reject) => {
    let threads = await threadCollection
      .find()
      .toArray();
    if (threads) {
      resolve(threads);
    } else {
      reject();
    }
  });
};

// Thread.find = function(id) {
//   return new Promise(async (resolve, reject) => {
//     if (typeof id != "string" || !ObjectID.isValid(id)) {
//       reject();
//       return;
//     }
//     let threads = await threadCollection
//       .aggregate([
//         { $match: { author: new ObjectID(id) } },
//         {
//           $lookup: {
//             from: "users",
//             localField: "author",
//             foreignField: "_id",
//             as: "authorDocument"
//           }
//         },
//         {
//           $project: {
//             thread: 1,
//             createdDate: 1,
//             author: { $arrayElemAt: ["$authorDocument", 0] }
//           }
//         }
//       ])
//       .toArray();
//     // // Cleanup author property in each thread object
//     // threads = threads.map(function(thread) {
//     //   thread.author = {
//     //     username: thread.author.username,
//     //     avatar: new User(thread.author, true).avatar
//     //   };
//     //   return thread;
//     // });
//     resolve(threads)
//   });
// };




module.exports = Thread;
