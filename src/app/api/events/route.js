import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Events from "../../../models/Events.js";

export const GET = async (request) => {
  try {
    await connect();

    const events = await Events.find().sort({ date: 1 });
    console.log("Fetched events:", events);
    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error.stack); // Log the full error stack
    return new NextResponse("Database error!", { status: 500 });
  }
};
