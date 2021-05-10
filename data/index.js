const postData = require("./posts");
const userData = require("./users");
const commentData = require("./comments");
const lockedPostData = require("./lockedPosts");

module.exports = {
  posts: postData,
  comments: commentData,
  users: userData,
  lockedPosts: lockedPostData,
};
