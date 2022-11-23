const express = require("express");
const router = express.Router();
const Post = require("../models/postschema");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json(allPosts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let postId = req.params.id;
    const allPosts = await Post.find();
    if (postId <= allPosts.length) {
      res.json(allPosts[postId - 1]);
    } else {
      res.json({
        message:
          "Please enter valid post number, there are only " +
          `${allPosts.length}` +
          " posts",
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.remove({ _id: req.params.id });
    res.json(deletedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log("check request body", req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
    console.log(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
