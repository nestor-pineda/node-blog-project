const { render } = require("ejs");
const express = require("express"); // Express
const mongoose = require("mongoose"); // Mongoose
const blogRoutes = require("./routes/blogRoutes"); //Blog route handlers

// Express App
const app = express();

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
app.use(express.urlencoded({ extended: true })); // Form data accepting

// Respond to requests
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404 not found " });
});
