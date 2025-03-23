import { NextResponse } from "next/server";
import connect from "../../../utils/db.js";
import BlogPosts from "../../../models/Posts.js";

export const GET = async (request) => {
  console.log(request);
  try {
    await connect();

    const blogs = await BlogPosts.find().sort({ date: -1 });
    return new NextResponse(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error.stack);
    return new NextResponse("Database error!", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connect();

    const body = await request.json();

    const newBlogPost = new BlogPosts({
      title: body.title,
      author: body.author,
      desc: body.desc,
      content: body.content,
      date: body.date || new Date(),
      themes: body.themes || [],
    });

    await newBlogPost.save();
    return new NextResponse("Blog post created successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error.stack);
    return new NextResponse(`Failed to create blog post: ${error.message}`, {
      status: 500,
    });
  }
};
