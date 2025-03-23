import { NextResponse } from "next/server";
import connect from "../../../../utils/db";
import Events from "../../../../models/Events.js";
import mongoose from "mongoose";


export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid event ID", { status: 400 });
    }

    const currentEvent = await Events.findById(id);
    if (!currentEvent) {
      return new NextResponse("Event not found", { status: 404 });
    }

    const previousEvent = await Events.findOne({
      date: { $lt: currentEvent.date },
    })
      .sort({ date: -1 })
      .exec();

    const nextEvent = await Events.findOne({
      date: { $gt: currentEvent.date },
    })
      .sort({ date: 1 })
      .exec();

    return new NextResponse(
      JSON.stringify({
        current: currentEvent,
        previous: previousEvent || null,
        next: nextEvent || null,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event:", error.message);
    return new NextResponse("Database error!", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid event ID", { status: 400 });
    }

    const data = await request.json();

    const updatedEvent = await Events.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true, 
    });

    if (!updatedEvent) {
      return new NextResponse("Event not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedEvent), { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error.message);
    return new NextResponse("Database error!", { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid event ID", { status: 400 });
    }

    const deletedEvent = await Events.findByIdAndDelete(id);

    if (!deletedEvent) {
      return new NextResponse("Event not found", { status: 404 });
    }

    return new NextResponse("Event deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return new NextResponse("Database error!", { status: 500 });
  }
};
