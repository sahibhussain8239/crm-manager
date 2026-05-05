import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import Event from "@/models/event";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const events = await Event.find({ organizationId: session.user.organizationId }).sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching events" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'sales_admin') {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { eventId, clientName, eventDate, time, eventType, venues } = await req.json();

    const newEvent = await Event.create({
      eventId,
      clientName,
      eventDate,
      time,
      eventType,
      venues,
      organizationId: session.user.organizationId,
      status: 'booked' // Initially setting as booked per requirements
    });

    return NextResponse.json({ message: "Event created and booked!", event: newEvent }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating event" }, { status: 500 });
  }
}
