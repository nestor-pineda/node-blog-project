const Blog = require("../models/blog"); // Blog file

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Blog" });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("single", { blog: result, title: "Single Blog" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id) // After we delete the blog-post
    .then((result) => {
      // then we will send a response to the browser
      res.json({ redirect: "/blogs" }); // ist going to be a json object
    }) // that contains a redirection to /blogs
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_create_post,
  blog_create_get,
  blog_details,
  blog_delete,
};
