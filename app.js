const express = require("express");

// Express App
const app = express();

//Mongoose
const mongoose = require("mongoose");

// Blog file
const Blog = require("./models/blog");

// Connection to MongoDB
const uri = "mongodb+srv://nestor:HolaHola@cluster0.zyigi.mongodb.net/node-tut?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000)) // Listen for requests
  .catch((err) => console.log(err));

// Register View Engine
app.set("view engine", "ejs");

// Middleware & static files
app.use(express.static("public"));

// Interaction with DB
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog post 2",
    snippet: "About my blog",
    body: "Text inside my blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("619e1a05a4523e49f2bbb944")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Respond to requests
app.get("/", (req, res) => {
  const blogs = [
    { title: "El nombre del viento", snippet: "Bla bla bla " },
    { title: "El temor de un hombre savio", snippet: "Bla bla bla " },
    { title: "El libro que nunca saldrá", snippet: "Bla bla bla " },
  ];
  // res.render("index", { title: "Home", blogs: blogs });
  // Bc the key name & key value have the same name, we can just put blogs
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404 not found " });
});
