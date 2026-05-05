import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import Event from "@/models/event";

export async function PUT(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'production_admin') {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { eventId, managerId } = await req.json();

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { managerId, status: 'assigned' },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event assigned to manager!", event: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error assigning event" }, { status: 500 });
  }
}
