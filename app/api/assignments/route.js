import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import Assignment from "@/models/assigment";
import Event from "@/models/event";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    const userId = searchParams.get('userId');

    let query = {};
    if (eventId) query.eventId = eventId;
    if (userId) query.userId = userId;
    else if (session.user.role === 'team_member') query.userId = session.user.id;

    const assignments = await Assignment.find(query)
      .populate('eventId', 'clientName eventType')
      .populate('userId', 'name email role');
      
    return NextResponse.json(assignments);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching assignments" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'manager') {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { eventId, userId, role, functionName, time, venue, eventDate } = await req.json();

    const newAssignment = await Assignment.create({
      eventId,
      userId,
      role,
      function: functionName,
      time,
      venue,
      eventDate
    });

    return NextResponse.json({ message: "Team member assigned successfully", assignment: newAssignment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating assignment" }, { status: 500 });
  }
}

export async function PUT(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'team_member') {
           return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    
        const { assignmentId, status } = await req.json();
    
        const updatedAssignment = await Assignment.findOneAndUpdate(
            { _id: assignmentId, userId: session.user.id },
            { status },
            { new: true }
        );
    
        if (!updatedAssignment) {
            return NextResponse.json({ message: "Assignment not found or unauthorized" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Status updated successfully", assignment: updatedAssignment }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating assignment" }, { status: 500 });
    }
}
