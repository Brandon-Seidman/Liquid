const express = require("express");
const router = express.Router();
router.use(express.json());

const postData = require("../data/posts");
const commentData = require("../data/comments");

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

router.get("/:id", async (req, res) => {
  try {
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
