//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

// Import User Model
const User = require('../models/User')

exports.login = ()=>{

}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register();
    
    res.send("thanks")

}
exports.logout = () => {

}
exports.home = (req, res) => {
    res.render('home-guest')
}