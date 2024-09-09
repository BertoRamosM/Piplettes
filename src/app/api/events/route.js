import { NextResponse } from "next/server";
import connect from "../../../utils/db"; // Ensure correct path to db utility
import Events from "../../../models/Events"; // Ensure correct path to the Events model

// Handle GET requests to fetch all events
export const GET = async (request) => {
  try {
    // Establish database connection
    await connect();

    // Fetch events from the database and sort by date (ascending)
    const events = await Events.find().sort({ date: 1 });

    // Return the fetched events as a JSON response
    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (error) {
    // Log the error and return a 500 response
    console.error("Error fetching events:", error.stack);
    return new NextResponse("Database error!", { status: 500 });
  }
};

// Handle POST requests to create a new event
export const POST = async (request) => {
  try {
    // Establish database connection
    await connect();

    // Parse the request body as JSON
    const body = await request.json();

    // Create a new event with the provided data
    const newEvent = new Events({
      title: body.title,
      director: body.director,
      desc: body.desc,
      synopsis: body.synopsis,
      image: body.image,
      date: body.date || new Date(),
      hour: body.hour || "",
      day: body.day || "",
      month: body.month || "",
      themes: body.themes || [],
      release: body.release,
    });

    // Save the new event to the database
    await newEvent.save();

    // Return a success message with a 201 status
    return new NextResponse("Event created successfully", { status: 201 });
  } catch (error) {
    // Log the error and return a 500 response with the error message
    console.error("Error creating event:", error.stack);
    return new NextResponse(`Failed to create event: ${error.message}`, {
      status: 500,
    });
  }
};
