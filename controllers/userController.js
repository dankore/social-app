//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

const User = require('../models/User')

exports.login = ()=>{

}

exports.register = (req, res) => {
    console.log(req.body)
    res.send("thanks")

}
exports.logout = () => {

}
exports.home = (req, res) => {
    res.render('home-guest')
}