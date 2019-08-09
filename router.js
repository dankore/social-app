//List urls/routes we looking for in get. post
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('home-guest');
})

//Export router
module.exports = router