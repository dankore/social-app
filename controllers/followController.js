const Follow = require('../models/Follow')

exports.addFollow = (req, res)=>{
    let follow = new Follow(req.params.username, req.visitorId)
    follow.create().then(()=>{

    }).catch(()=>{
        
    })
}