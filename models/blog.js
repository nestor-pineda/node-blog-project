// Require Mongoose
const mongoose = require("mongoose");
// We get the Schema from Mongoose package. This is a constructor function.
const Schema = mongoose.Schema;
// We now create our new schema instance using the constructor function.
const blogSchema = new Schema(
  {
    // We pass an object that describers the structure of the documents we want to store in our blogs collection. This is the Schema of our blog post.
    title: {
      type: String, // Determines the type of data expected
      required: true, // Required to fill before sending.
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // This will auto assign the inserted values to those properties.

// Models are defined with capital letter. We use the .model method that takes two parameters, the name of the Model and the name of the Schema. Tne name of the model should be the singular of the name of the Collection created on MongoDB previously.
const Blog = mongoose.model("Blog", blogSchema);

// We now export const Blog so we can use it elsewhere.
module.exports = Blog;
