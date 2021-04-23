const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const uuid = require("uuid");

let exportedMethods = {
  async getAllPosts() {
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    return postList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getPostById(id) {
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: id });
    if (!post) throw "post not found";
    return post;
  },

  async getPostByUser(user) {
    const postCollection = await posts();
    const post = await postCollection.find({ postedBy: user }).toArray();
    if (!post) throw "post not found";
    return post;
  },

  async addpost(user, title, description, ingredients) {
    const postCollection = await posts();

    if (!user || !description || !title || !ingredients)
      throw "Please provide all data when creating a post";

    if (typeof description !== "string") throw "description must be a string";
    if (typeof user !== "string") throw "posterUsername must be a string";
    if (typeof title !== "string") throw "title must be a string";
    if (!Array.isArray(ingredients)) throw "ingredients must be a array";

    let newpost = {
      user: user,
      title: title,
      description: description,
      likes: [],
      comments: [],
      ingredients: ingredients,
    };

    const newInsertInformation = await postCollection.insertOne(newpost);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return await this.getPostById(newInsertInformation.insertedId);
  },

  async removepost(id) {
    const postCollection = await posts();
    const deletionInfo = await postCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    return true;
  },

  async updatepost(user, title, description, likes, comments, ingredients) {
    const post = await this.getPostById(id);
    if (typeof description !== "string") throw "description must be a string";
    if (typeof user !== "string") throw "posterUsername must be a string";
    if (typeof title !== "string") throw "title must be a string";
    if (!Array.isArray(ingredients)) throw "ingredients must be a array";
    if (!Array.isArray(comments)) throw "comments must be a array";
    if (!Array.isArray(likes)) throw "likes must be a array";

    const postUpdateInfo = {
      user: user,
      title: title,
      description: description,
      likes: likes,
      comments: comments,
      ingredients: ingredients,
    };

    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
      { _id: id },
      { $set: postUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";

    return await this.getPostById(id);
  },
};

module.exports = exportedMethods;
