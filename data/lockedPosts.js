const mongoCollections = require("../config/mongoCollections");
const lockedPosts = mongoCollections.lockedPosts;
const uuid = require("uuid");

let exportedMethods = {
  async getAllPosts() {
    const postCollection = await lockedPosts();
    const postList = await postCollection.find({}).toArray();
    return postList;
  },

  async getPostById(id) {
    const postCollection = await lockedPosts();
    const post = await postCollection.findOne({ _id: id });
    if (!post) throw "post not found";
    return post;
  },

  async addpost(title, description, ingredients, points) {
    const postCollection = await lockedPosts();

    if (!points || !description || !title || !ingredients)
      throw "Please provide all data when creating a post";

    if (typeof description !== "string") throw "description must be a string";
    if (isNaN(points)) throw "points must be an int";
    if (typeof title !== "string") throw "title must be a string";
    if (!Array.isArray(ingredients)) throw "ingredients must be a array";

    let newpost = {
      title: title,
      description: description,
      points: points,
      ingredients: ingredients,
      unlocked: [],
      _id: uuid.v4(),
    };

    const newInsertInformation = await postCollection.insertOne(newpost);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return await this.getPostById(newInsertInformation.insertedId);
  },

  async removepost(id) {
    const postCollection = await lockedPosts();
    const deletionInfo = await postCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete post with id of ${id}`;
    }
    return true;
  },

  async updatepost(id, title, description, ingredients, points, unlocked) {
    const post = await this.getPostById(id);
    if (typeof description !== "string") throw "description must be a string";
    if (typeof title !== "string") throw "title must be a string";
    if (!Array.isArray(ingredients)) throw "ingredients must be a array";
    if (!Array.isArray(unlocked)) throw "unlocked must be an array";
    if (isNaN(points)) throw "points must be a number";

    const postUpdateInfo = {
      title: title,
      description: description,
      points: points,
      ingredients: ingredients,
      unlocked: unlocked,
    };

    const postCollection = await lockedPosts();
    const updateInfo = await postCollection.updateOne(
      { _id: id },
      { $set: postUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";

    return await this.getPostById(id);
  },
  async unlockPost(id, userid) {
    const post = await this.getPostById(id);
    post.unlocked.push(userid);
    const postUpdateInfo = {
      title: post.title,
      description: post.description,
      points: post.points,
      ingredients: post.ingredients,
      unlocked: post.unlocked,
    };
    const postCollection = await lockedPosts();
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
