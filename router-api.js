const apiRouter = require('express').Router()

apiRouter.post('/login', function(req, res){
    res.json("Thank, for trying to login from our api")
})
module.exports = apiRouter