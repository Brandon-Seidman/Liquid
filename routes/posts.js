const express = require("express");
const router = express.Router();
router.use(express.json());

const postData = require("../data/posts");

router.get("/", async (req, res) => {
  try {
    let data = await postData.getAllPosts();
    if (data.length === 0) {
      res.status(404).json({ error: "Looks like there's nothing here yet!" });
      return;
    }
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
});
module.exports = router;
