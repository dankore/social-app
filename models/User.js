//This is a constructor function
// Throws error if in arrow function
let User = function(data){
    this.data = data;
    this.errors = []
}

User.prototype.validate =  () => {
    if (this.data.username == "") { this.errors.push("You must provide a username")}
    if (this.data.email == "") { this.errors.push("You must provide a valid email address") }
    if (this.data.password == "") { this.errors.push("You must provide a password") }
}
User.prototype.register = () => {
    // Step #1: Validate user data
    this.validate()

    // Step #2: Only if there no validation error
    // then save the user data into the database
}

module.exports = User