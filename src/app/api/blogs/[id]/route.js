import { NextResponse } from "next/server";
import connect from "../../../../utils/db";
import BlogPosts from "../../../../models/Posts";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid blog post ID", { status: 400 });
    }

    const currentBlog = await BlogPosts.findById(id);
    if (!currentBlog) {
      return new NextResponse("Blog post not found", { status: 404 });
    }

    const previousBlog = await BlogPosts.findOne({
      date: { $lt: currentBlog.date },
    })
      .sort({ date: -1 })
      .exec();

    const nextBlog = await BlogPosts.findOne({
      date: { $gt: currentBlog.date },
    })
      .sort({ date: 1 })
      .exec();

    return new NextResponse(
      JSON.stringify({
        current: currentBlog,
        previous: previousBlog || null,
        next: nextBlog || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error.message);
    return new NextResponse("Database error!", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid blog post ID", { status: 400 });
    }

    const data = await request.json();

    const updatedBlog = await BlogPosts.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return new NextResponse("Blog post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error.message);
    return new NextResponse("Database error!", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid blog post ID", { status: 400 });
    }

    const deletedBlog = await BlogPosts.findByIdAndDelete(id);

    if (!deletedBlog) {
      return new NextResponse("Blog post not found", { status: 404 });
    }

    return new NextResponse("Blog post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting blog post:", error.message);
    return new NextResponse("Database error!", { status: 500 });
  }
};
