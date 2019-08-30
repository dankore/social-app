const Comments = require('../models/Comments')
// const Follow = require("../models/Follow");

exports.create = function(){
let comments = new Comments(req.body)
comments.create()
}
