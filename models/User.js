const bcrypt = require("bcryptjs");
const validator = require("validator");
const md5 = require("md5");

const usersCollection = require("../db")
  .db()
  .collection("users");

//This is a constructor function
// Throws error if in arrow function
let User = function(data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function() {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  // Get rid of any bogus property
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  };
};

User.prototype.login = function() {
  // Check to make sure it is a string
  //The arrow function keeps the value of the 'this' keyword
  // Traditonal function(){} manipulates the 'this' keyword
  return new Promise((resolve, reject) => {
    this.cleanUp();
    usersCollection
      .findOne({ username: this.data.username })
      .then(attmptedUser => {
        if (
          attmptedUser &&
          bcrypt.compareSync(this.data.password, attmptedUser.password)
        ) {
          resolve("Congrats!!");
        } else {
          reject("Invalid username/password.");
        }
      })
      .catch(() => {
        reject("Please try again later.");
      });
  });
};
User.prototype.validate = function() {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("You must provide a username.");
    }
    if (
      this.data.username != "" &&
      !validator.isAlphanumeric(this.data.username)
    ) {
      this.errors.push("Username can only contain letters and numbers");
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("You must provide a valid email address.");
    }
    if (this.data.password == "") {
      this.errors.push("You must provide a password.");
    }

    //Password be at least 5 characters
    if (this.data.password.length > 0 && this.data.password.length < 5) {
      this.errors.push("Password must be at least 5 characters.");
    }
    if (this.data.password.length > 50) {
      this.errors.push("Password cannot exceed 50 characters.");
    }

    //Username be at least 3 characters
    if (this.data.username.length > 0 && this.data.password.length < 3) {
      this.errors.push("Username must be at least 3 characters.");
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username cannot exceed 30 characters.");
    }

    // Only if username is valid, then check to see if its already taken
    if (
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric
    ) {
      let usernameExists = await usersCollection.findOne({
        username: this.data.username
      });
      if (usernameExists) {
        this.errors.push("That username is already taken.");
      }
    }

    // Only if email is valid, then check to see if its already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({
        email: this.data.email
      });
      if (emailExists) {
        this.errors.push("That email is being used.");
      }
    }

    resolve();
  });
};

User.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    //Make sure username is string
    this.cleanUp();
    // Step #1: Validate user data
    await this.validate();

    // Step #2: Only if there no validation error
    // then save the user data into the database
    if (!this.errors.length) {
      // Hash user password
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      await usersCollection.insertOne(this.data);
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

User.prototype.getAvatar = () => {
  this.avatar = `http://gravatar.com/avatar/${md5(this.data.email)}?s=123`;
};

module.exports = User;
