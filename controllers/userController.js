//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

// Import User Model
const User = require('../models/User')

exports.login = (req, res) => {
    //Create an instance of User object 
    // And look into the body of the form => req.body for submissions
    let user = new User(req.body)
    user.login().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register();

    if (user.errors.length) {
        res.send(user.errors)
    } else {
        res.send("Congrats there no errors")
    }

}
exports.logout = () => {

}
exports.home = (req, res) => {
    res.render('home-guest')
}