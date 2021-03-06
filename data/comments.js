const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const users = require("./users");
const uuid = require("uuid");

let exportedMethods = {
  async getAllComments() {
    const commentCollection = await comments();
    return await commentCollection.find({}).toArray();
  },
  async getCommentById(id) {
    const commentCollection = await comments();
    const comment = await commentCollection.findOne({ _id: id });

    if (!comment) throw "comment not found";
    return comment;
  },
  async addComment(commentBy, description, post) {
    const commentCollection = await comments();

    if (!commentBy || !description || !post)
      throw "Please provide all data when creating a comment";

    if (typeof commentBy !== "string") throw "commentBy must be a string";
    if (typeof description !== "string") throw "description must be a string";
    if (typeof post !== "string") throw "post must be a string";

    let newComment = {
      commentBy: commentBy,
      description: description,
      post: post,
      _id: uuid.v4(),
    };

    const newInsertInformation = await commentCollection.insertOne(newComment);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";

    return this.getCommentById(newInsertInformation.insertedId);
  },
  async removeComment(id) {
    const commentCollection = await comments();
    const deletionInfo = await commentCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0)
      throw `Could not delete comment with id of ${id}`;
    return true;
  },
  async updateComment(id, commentBy, description, post) {
    const commentCollection = await comments();
    if (commentBy)
      if (typeof commentBy !== "string") throw "commentBy must be a string";
    if (description)
      if (typeof description !== "string") throw "description must be a string";
    if (post) if (typeof post !== "string") throw "post must be a string";

    let updatedComment = {
      commentBy: commentBy,
      description: description,
      post: post,
    };
    const updateInfo = await commentCollection.updateOne(
      { _id: id },
      { $set: updatedComment }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";
    return this.getCommentById(id);
  },
};

module.exports = exportedMethods;
