//This file list urls/routes we looking for in get. post
const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)

//Export router
module.exports = router