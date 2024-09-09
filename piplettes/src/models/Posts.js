import mongoose from "mongoose";

const { Schema } = mongoose;

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    themes: {
      type: [String],
    },
  },
  { timestamps: true }
);

const BlogPosts =
  mongoose.models.BlogPosts || mongoose.model("BlogPosts", blogPostSchema);

export default BlogPosts;
