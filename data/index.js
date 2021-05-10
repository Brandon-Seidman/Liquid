const postData = require("./posts");
const userData = require("./users");
const commentData = require("./comments");
const unlockedPostData = require("./unlockedPosts");

module.exports = {
  posts: postData,
  comments: commentData,
  users: userData,
  lockedPosts: unlockedPostData,
};
