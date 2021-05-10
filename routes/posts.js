const express = require("express");
const router = express.Router();
router.use(express.json());

const postData = require("../data/posts");
const commentData = require("../data/comments");
const userData = require("../data/users");
const lockedPostData = require("../data/lockedPosts");

router.get("/", async (req, res) => {
  try {
    let data = await postData.getAllPosts();
    if (data.length === 0) {
      res.status(404).json({ error: "Looks like there's nothing here yet!" });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
});
router.get("/lockedPosts", async (req, res) => {
  try {
    let data = await lockedPostData.getAllPosts();
    console.log(data);
    if (data.length === 0) {
      res.status(404).json({ error: "Looks like there's nothing here yet!" });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
});
router.post("/lockedPosts/unlock/", async (req, res) => {
  try {
    let data = await lockedPostData.unlockPost(req.body.postId);
    if (data.length === 0) {
      res.status(404).json({ error: "I couldn't find that post for you :(" });
      return;
    }
    let userData2 = await userData.getUserById(req.body.userId);
    if (userData2.points < data.points) {
      return res.status(200).json({ response: "insufficient funds" });
    } else {
      await userData.subPoints(req.body.userId, data.points);
      return res.status(200).json({ response: "success" });
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).status({ error: e });
  }
});

router.post("/like", async (req, res) => {
  try {
    const username = await userData.getUserByUsername(req.body.username);
    const data = await postData.like(req.body.postId);
    const user = await userData.addPoints(username._id);
    await userData.like(req.body.userId, req.body.postId);

    if (!data) {
      return res.status(404).json("Post not found");
    }
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
router.post("/unlike", async (req, res) => {
  try {
    const username = await userData.getUserByUsername(req.body.username);
    const data = await postData.unlike(req.body.postId);
    const user = await userData.subPoints(username._id, 1);
    await userData.unlike(req.body.userId, req.body.postId);

    if (!data) {
      return res.status(404).json("Post not found");
    }
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
router.post("/liked", async (req, res) => {
  try {
    const data = await userData.getUserById(req.body.userId);
    if (!data) {
      return res.status(404).json("User not found");
    }

    let liked = [];

    for (let i = 0; i < data.likes.length; i++) {
      const newData = await postData.getPostById(data.likes[i]);
      liked.push(newData);
    }

    return res.status(200).json(liked);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post("/isLiked", async (req, res) => {
  try {
    const data = await userData.getUserById(req.body.userId);
    if (!data) {
      return res.status(404).json("User not found");
    }

    for (let i = 0; i < data.likes.length; i++) {
      if (data.likes[i] === req.body.postId) {
        return res.status(200).json({ liked: true });
      }
    }
    return res.status(200).json({ liked: false });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (req.params.id === "my-page") {
      return res.status(200);
    }
    let data = await postData.getPostById(req.params.id);

    if (!data) {
      res.status(404).json({ error: "Post not found" });
    }
    if (data.comments.length > 0) {
      for (let i = 0; i < data.comments.length; i++) {
        data.comments[i] = await commentData.getCommentById(data.comments[i]);
      }
    }
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
