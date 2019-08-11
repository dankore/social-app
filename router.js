//This file list urls/routes we looking for in get. post
const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const postController = require("/.controllers/postController");

// User related routes
router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// Post related routes
router.get("/create-post", postController.viewScreateScreen);

//Export router
module.exports = router;
