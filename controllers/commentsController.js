const Comments = require('../models/Comments')

exports.create = function(){
let comments = new Comments(req.body)
comments.create()
}
