// Import User Model
const User = require("../models/User");
const Post = require("../models/Post");
const Follow = require("../models/Follow");

exports.sharedProfileData = async function(req, res, next) {
  let isVisitorsProfile = false;
  let isFollowing = false;
  if (req.session.user) {
    isVisitorsProfile = req.profileUser._id.equals(req.session.user._id);
    isFollowing = await Follow.isVisitorFollowing(
      req.profileUser._id,
      req.visitorId
    );
  }

  req.isVisitorsProfile = isVisitorsProfile;
  req.isFollowing = isFollowing;
  // retrieve post, follower, and following counts
  let postCountPromise = Post.countPostsByAuthor(req.profileUser._id);
  let followerCountPromise = Follow.countFollowersById(req.profileUser._id);
  let followingCountPromise = Follow.countFollowingById(req.profileUser._id);
  let [postCount, followerCount, followingCount] = await Promise.all([
    postCountPromise,
    followerCountPromise,
    followingCountPromise
  ]);

  req.postCount = postCount;
  req.followerCount = followerCount;
  req.followingCount = followingCount;

  next();
};

//Below is an alternative access
// module.exports = {
//     login: ()=>{},
//     logout: () => { }
// }

exports.mustBeLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash("errors", " You must be logged in to perform that action");
    req.session.save(() => {
      res.redirect("/");
    });
  }
};

exports.login = (req, res) => {
  //Create an instance of User object
  // And look into the body of the form => req.body for submissions
  let user = new User(req.body);
  user
    .login()
    .then(result => {
      req.session.user = {
        avatar: user.avatar,
        username: user.data.username,
        _id: user.data._id
      };
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch(error => {
      // Flash is accessing this => req.session.flash.errors = [errors]
      req.flash("errors", error);
      req.session.save(() => {
        res.redirect("/");
      });
    });
};

exports.register = function(req, res) {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      req.session.user = {
        username: user.data.username,
        avatar: user.avatar,
        _id: user.data._id
      };
      req.session.save(function() {
        res.redirect("/");
      });
    })
    .catch(regErrors => {
      regErrors.forEach(function(error) {
        req.flash("regErrors", error);
      });
      req.session.save(function() {
        res.redirect("/");
      });
    });
};
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.home = async (req, res) => {
  if (req.session.user) {
    //fetch feed of posts for current user
    let posts = await Post.getFeed(req.session.user._id);
    res.render("home-dashboard", { posts: posts });
  } else {
    res.render("home-guest", {
      regErrors: req.flash("regErrors")
    });
  }
};

exports.ifUserExists = (req, res, next) => {
  User.findByUserName(req.params.username)
    .then(userDocument => {
      req.profileUser = userDocument;
      next();
    })
    .catch(() => {
      res.render("404");
    });
};

exports.profilePostsScreen = function(req, res) {
  // ask our post model for posts by a certain author id
  Post.findByAuthorId(req.profileUser._id)
    .then(function(posts) {
      console.log(req.profileUser);
      res.render("profile", {
        title: `Profile for ${req.profileUser.username}`,
        currentPage: "posts",
        posts: posts,
        profileUsername: req.profileUser.username,
        profileAvatar: req.profileUser.avatar,
        isFollowing: req.isFollowing,
        isVisitorsProfile: req.isVisitorsProfile,
        counts: {
          postCount: req.postCount,
          followerCount: req.followerCount,
          followingCount: req.followingCount
        }
      });
    })
    .catch(function() {
      res.render("404");
    });
};

exports.profileFollowersScreen = async function(req, res) {
  try {
    let followers = await Follow.getFollowersById(req.profileUser._id);
    res.render("profile-followers", {
      currentPage: "followers",
      followers: followers,
      profileUsername: req.profileUser.username,
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorsProfile: req.isVisitorsProfile,
      counts: {
        postCount: req.postCount,
        followerCount: req.followerCount,
        followingCount: req.followingCount
      }
    });
  } catch {
    res.render("404");
  }
};

exports.profileFollowingScreen = async function(req, res) {
  try {
    let following = await Follow.getFollowingById(req.profileUser._id);
    res.render("profile-following", {
      currentPage: "following",
      following: following,
      profileUsername: req.profileUser.username,
      profileAvatar: req.profileUser.avatar,
      isFollowing: req.isFollowing,
      isVisitorsProfile: req.isVisitorsProfile,
      counts: {
        postCount: req.postCount,
        followerCount: req.followerCount,
        followingCount: req.followingCount
      }
    });
  } catch {
    res.render("404");
  }
};
