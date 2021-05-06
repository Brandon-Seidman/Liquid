const express = require("express");
const data = require("../data/");
const bcrypt = require("bcrypt");
const {
  default: ActionAssignmentReturn,
} = require("material-ui/svg-icons/action/assignment-return");
const userData = data.users;
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
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
module.exports = router;
