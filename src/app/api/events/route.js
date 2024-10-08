import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Events from "../../../models/Events.js";


export const GET = async (request) => {
  console.log(request);
  try {
    await connect();

    // Fetch and sort events
    const events = await Events.find().sort({ date: 1 });
    console.log("Fetched events:", events);

    // Return response with no-cache headers to prevent caching
    return new NextResponse(JSON.stringify(events), {
      status: 200,
      headers: {
        "Cache-Control": "no-store", // Ensure no caching
        "Content-Type": "application/json", // Specify content type
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error.stack); // Log the full error stack
    return new NextResponse("Database error!", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connect();

    const body = await request.json();
    console.log("Request body:", body);

    const newEvent = new Events({
      title: body.title,
      director: body.director,
      desc: body.desc,
      synopsis: body.synopsis,
      image: body.image,
      date: body.date || null,
      hour: body.hour || "",
      day: body.day || "",
      month: body.month || "",
      themes: body.themes || [],
      release: body.release,
    });

    await newEvent.save();
    console.log("Event created:", newEvent); // Log the created event

    return new NextResponse("Event created successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error.stack); // Log the full error stack
    return new NextResponse(`Failed to create event: ${error.message}`, {
      status: 500,
    });
  }
};
