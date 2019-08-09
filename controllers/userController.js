//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

exports.login = ()=>{

}
exports.logout = () => {

}
exports.home = (req, res) => {
    res.render('home-guest')
}