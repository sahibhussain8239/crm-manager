import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import Event from "@/models/event";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'manager') {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const events = await Event.find({ managerId: session.user.id }).sort({ eventDate: 1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching manager events" }, { status: 500 });
  }
}
