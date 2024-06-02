const mongoose = require("../db");

const Schema = mongoose.Schema;

const BlogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchema);

module.exports = Blog;
