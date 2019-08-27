const threadCollection = require("../db")
  .db()
  .collection("thread2");
const sanitizeHTML = require("sanitize-html");

let Thread = function(data) {
  this.data = data;
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
    createdDate: new Date()
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
          resolve(thread);
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
    let threads = await threadCollection.find().toArray();
    if (threads) {
      resolve(threads);
    } else {
      reject();
    }
  });
};

module.exports = Thread;
