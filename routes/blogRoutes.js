const express = require("express");
const Blog = require("../models/blog"); // Blog file
const router = express.Router();

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Blog" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id; // id = :id, could be nuts = :nuts
  Blog.findById(id)
    .then((result) => {
      res.render("single", { blog: result, title: "Single Blog" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id) // After we delete the blog-post
    .then((result) => {
      // then we will send a response to the browser
      res.json({ redirect: "/blogs" }); // ist going to be a json object
    }) // that contains a redirection to /blogs
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
