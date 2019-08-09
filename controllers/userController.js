//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

exports.login = ()=>{

}

exports.register = (req, res) => {
    res.send("thanks")

}
exports.logout = () => {

}
exports.home = (req, res) => {
    res.render('home-guest')
}