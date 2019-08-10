//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

// Import User Model
const User = require('../models/User')

exports.login = () => {

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