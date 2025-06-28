import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Events from "../../../models/Events";

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connect();
    console.log('✅ Connected to MongoDB in API route');

    console.log('Fetching events from database...');
    const events = await Events.find().sort({ date: 1 });
    console.log('Fetched events:', events);

    if (events.length === 0) {
      console.warn('⚠️ No events found in MongoDB collection.');
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    return new NextResponse("Database error!", { status: 500 });
  }
}

export const POST = async (request) => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connect();
    console.log('✅ Connected to MongoDB in API route');

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
      plus: body.plus || "",
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