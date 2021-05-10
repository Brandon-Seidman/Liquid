const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("uuid");

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },
  async getUserByUsername(usern) {
    const userCollection = await users();
    const user = await userCollection.findOne({ username: usern });
    if (!user) throw "User not found";
    return user;
  },

  async addUser(username, password) {
    const userCollection = await users();

    if (!username || !password)
      throw "Please provide all data when creating a user";

    if (typeof username !== "string") throw "username must be a string";
    if (typeof password !== "string") throw "password must be a string";

    let newUser = {
      username: username.toLowerCase(),
      password: password,
      friendList: [],
      posts: [],
      likes: [],
      points: 10,
      _id: uuid.v4(),
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return await this.getUserById(newInsertInformation.insertedId);
  },

  async removeUser(id) {
    const userCollection = await users();
    const deletionInfo = await userCollection.deleteOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },

  async updateUser(id, username, password, friendList, posts, likes, points) {
    const user = await this.getUserById(id);

    if (
      !id ||
      !username ||
      !password ||
      !friendList ||
      !posts ||
      !likes ||
      points === null
    )
      throw "Please provide all data when updating a user";

    if (username)
      if (typeof username !== "string") throw "username must be a string";
    if (password)
      if (typeof password !== "string") throw "password must be a string";
    if (!Array.isArray(friendList)) throw "friend list must be a string";
    if (!Array.isArray(posts)) throw "posts must be a string";
    if (!Array.isArray(likes)) throw "likes must be a string";
    const userUpdateInfo = {
      username: username.toLowerCase(),
      password: password,
      friendList: friendList,
      posts: posts,
      likes: likes,
      points: points,
    };

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";

    return await this.getUserById(id);
  },
  async addPoints(id) {
    try {
      if (!id) throw "Error: ID must be supplied";
      const user = await this.getUserById(id);
      let point = user.points + 1;
      const userUpdateInfo = {
        username: user.username,
        password: user.password,
        friendList: user.friendList,
        posts: user.posts,
        likes: user.likes,
        points: point,
      };
      const userCollection = await users();
      const updateInfo = await userCollection.updateOne(
        { _id: id },
        { $set: userUpdateInfo }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Update failed";

      return await this.getUserById(id);
    } catch (e) {
      console.log(e);
    }
  },
  async subPoints(id, amount) {
    try {
      if (!id) throw "Error: ID must be supplied";
      const user = await this.getUserById(id);
      let point = user.points - amount;
      const userUpdateInfo = {
        username: user.username,
        password: user.password,
        friendList: user.friendList,
        posts: user.posts,
        likes: user.likes,
        points: point,
      };
      const userCollection = await users();
      const updateInfo = await userCollection.updateOne(
        { _id: id },
        { $set: userUpdateInfo }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Update failed";

      return await this.getUserById(id);
    } catch (e) {
      console.log(e);
    }
  },
  async like(id, likeId) {
    try {
      if (!id) throw "Error: ID must be supplied";

      const user = await this.getUserById(id);
      user.likes.push(likeId);
      const userUpdateInfo = {
        username: user.username,
        password: user.password,
        friendList: user.friendList,
        posts: user.posts,
        likes: user.likes,
        points: user.points,
      };
      const userCollection = await users();
      const updateInfo = await userCollection.updateOne(
        { _id: id },
        { $set: userUpdateInfo }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Update failed";

      return await this.getUserById(id);
    } catch (e) {
      console.log(e);
    }
  },

  async unlike(id, likeId) {
    try {
      if (!id) throw "Error: ID must be supplied";
      const user = await this.getUserById(id);
      let index = user.likes.indexOf(likeId);
      user.likes.splice(index, 1);
      const userUpdateInfo = {
        username: user.username,
        password: user.password,
        friendList: user.friendList,
        posts: user.posts,
        likes: user.likes,
        points: user.points,
      };
      const userCollection = await users();
      const updateInfo = await userCollection.updateOne(
        { _id: id },
        { $set: userUpdateInfo }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw "Update failed";

      return await this.getUserById(id);
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = exportedMethods;
