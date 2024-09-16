import connect from "../../../../utils/db";
import { NextResponse } from "next/server";
import Events from "../../../../models/Events";

export const GET = async (request) => {
  console.log(request)
  try {
    await connect();

    const today = new Date();

    // Fetch all events
    const events = await Events.find({}).lean();

    if (!events || events.length === 0) {
      return new NextResponse(JSON.stringify([]), { status: 200 });
    }

    // Filter for upcoming events, including those with null or empty dates
    let upcomingEvents = events
      .filter((event) => {
        // Include events with no date or future dates
        return !event.date || new Date(event.date) > today;
      })
      .sort((a, b) => {
        // Sort by date, treating null/empty dates as last
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      })
      .slice(0, 3); // Limit to 3 events

    return new NextResponse(JSON.stringify(upcomingEvents), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return new NextResponse(`Database error: ${error.message}`, {
      status: 500,
    });
  }
};
