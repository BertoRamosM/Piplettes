import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Events from "../../../models/Events";

// GET request to fetch events
export async function GET(request) {
  try {
    // Establish database connection
    await connect();

    // Fetch events sorted by date
    const events = await Events.find().sort({ date: 1 });
    console.log("Fetched events:", events); // Log for debugging

    // Return events as a JSON response
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error.stack);
    return NextResponse.json({ error: "Database error!" }, { status: 500 });
  }
}

// POST request to create a new event
export async function POST(request) {
  try {
    // Establish database connection
    await connect();

    // Parse the request body
    const body = await request.json();

    // Create a new event
    const newEvent = new Events(body);
    await newEvent.save();

    // Return success message
    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error.stack);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
