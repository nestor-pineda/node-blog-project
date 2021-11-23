const express = require("express");

// Express App
const app = express();

// Register View Engine
app.set("view engine", "ejs");

// Listen for requests
app.listen(3000);

// Middleware & static files
app.use(express.static("public"));

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
