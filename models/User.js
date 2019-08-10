const validator = require("validator")

//This is a constructor function
// Throws error if in arrow function
let User = function (data) {
    this.data = data;
    this.errors = []
}

User.prototype.validate = function () {
    if (this.data.username == "") { this.errors.push("You must provide a username.") }
    if (!validator.isEmail(this.data.email)) { this.errors.push("You must provide a valid email address.") }
    if (this.data.password == "") { this.errors.push("You must provide a password.") }

    //Password be at least 8 characters
    if (this.data.password.length > 0 && this.data.password.length < 12) { this.errors.push("Password must be at least 12 characters.") }
    if (this.data.password.length > 100) { this.errors.push("Password cannot exceed 100 characters.") }

    //Password be at least 8 characters
    if (this.data.username.length > 0 && this.data.password.length < 3) { this.errors.push("Username must be at least 3 characters.") }
    if (this.data.username.length > 30) { this.errors.push("Username cannot exceed 30 characters.") }
}
User.prototype.register = function () {
    // Step #1: Validate user data
    this.validate()

    // Step #2: Only if there no validation error
    // then save the user data into the database
}

module.exports = User