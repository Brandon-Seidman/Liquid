const express = require("express");
const data = require("../data");
const bcrypt = require("bcrypt");
const {
  default: ActionAssignmentReturn,
} = require("material-ui/svg-icons/action/assignment-return");
const userData = data.users;
const router = express.Router();
router.use(express.json());

router.get("/user/:username", async (req, res) => {
  try {
    if (!req.params.username || !req.params.username.trim()) {
      return res.status(404).json({ error: "No username received " });
    }
    let data = await userData.getUserByUsername(req.params.username);

    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id || !req.params.id.trim()) {
      throw "Error: No id received";
    }
    let data = await userData.getUserById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
});

async function create(username, password) {
  let saltRounds = 10;
  let hash = await bcrypt.hash(password, saltRounds);
  let newUser = await userData.addUser(username, hash);
  return newUser;
}
router.post("/signup", async (req, res) => {
  try {
    const { data } = req.body;
    const username = data.username;
    const password = data.password;
    if (!username || !username.trim() || !password || !password.trim()) {
      throw "Error: No username or password received";
    }
    const users = await userData.getAllUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].username.toLowerCase() === username)
        return res.status(200).json({ username: "taken" });
    }
    let user = create(username, password);
    if (!user) {
      return res
        .status(404)
        .json({ error: "User could not be added to database" });
    }
    return res.status(200).json({ username: "added" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});
router.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    const username = data.username;
    const password = data.password;
    if (!username || !username.trim() || !password || !password.trim()) {
      throw "Error: No username or password received";
    }
    const users = await userData.getAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ error: "Error: No users found" });
    }
    let hashedPassword = "";
    let user;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username.toLowerCase() === username)
        hashedPassword = users[i].password;
      user = users[i];
    }
    if (hashedPassword === "") {
      return res.status(404).json({ error: "Oops something went wrong!" });
    }
    bcrypt.compare(password, hashedPassword, async (err, response) => {
      if (err) {
        console.log(err);
        console.log(":( wrong password");
        return res.status(401).json({ password: "Wrong password :(" });
      }
      if (response) {
        //res.cookie("AuthCookie", username);
        return res.status(200).json({ password: "Correct" });

        return;
      } else {
        return res.status(401).json({ error: "Something went wrong" });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});

router.post("/friend/:activeUser/:targetUser", async (req, res) => {
  try {
    const activeUserId = req.params.activeUser;
    const targetUserId = req.params.targetUser;
    if (
      !activeUserId ||
      !activeUserId.trim() ||
      !targetUserId ||
      !targetUserId.trim()
    ) {
      return res.status(400).json({ error: "Invalid UserId" });
    }

    const activeUser = await userData.getUserById(activeUserId);
    const targetUser = await userData.getUserById(targetUserId);
    if (!activeUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let newFriendsList = activeUser.friendList.filter(
      (id) => id !== targetUserId
    );
    newFriendsList.push(targetUserId);

    const result = await userData.updateUser(
      activeUser._id,
      activeUser.username,
      activeUser.password,
      newFriendsList,
      activeUser.posts,
      activeUser.likes,
      activeUser.points
    );

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post("/unfriend/:activeUser/:targetUser", async (req, res) => {
  try {
    const activeUserId = req.params.activeUser;
    const targetUserId = req.params.targetUser;
    if (
      !activeUserId ||
      !activeUserId.trim() ||
      !targetUserId ||
      !targetUserId.trim()
    ) {
      return res.status(400).json({ error: "Invalid UserId" });
    }

    const activeUser = await userData.getUserById(activeUserId);
    const targetUser = await userData.getUserById(targetUserId);
    if (!activeUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let newFriendsList = activeUser.friendList.filter(
      (id) => id !== targetUserId
    );

    const result = await userData.updateUser(
      activeUser._id,
      activeUser.username,
      activeUser.password,
      newFriendsList,
      activeUser.posts,
      activeUser.likes,
      activeUser.points
    );

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
