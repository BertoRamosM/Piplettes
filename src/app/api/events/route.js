import { NextResponse } from "next/server";
import connect from "../../../utils/db"; // Ensure correct path
import Events from "../../../models/Events"; // Ensure correct path

export const GET = async (request) => {
  try {
    // Establish a connection to the database
    await connect();
    console.log("Database connected for /api/events");

    // Fetch the events from the database
    const events = await Events.find().sort({ date: 1 });
    console.log("Fetched events:", events);

    // Return the fetched events as a JSON response
    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error.stack);
    return new NextResponse("Database error!", { status: 500 });
  }
};
