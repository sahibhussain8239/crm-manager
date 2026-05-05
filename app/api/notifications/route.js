import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import Notification from "@/models/Notification";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const notifications = await Notification.find({ 
      userId: session.user.id,
      read: false
    }).sort({ createdAt: -1 });

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching notifications" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { role, userId, message } = await req.json();

    let targetUsers = [];
    if (userId) {
      targetUsers = await User.find({ _id: userId });
    } else if (role) {
      targetUsers = await User.find({ role, organizationId: session.user.organizationId });
    }

    const notifications = targetUsers.map(u => ({
      userId: u._id,
      message,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    return NextResponse.json({ message: "Notifications sent" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending notification" }, { status: 500 });
  }
}

export async function PUT(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
        const { notificationIds } = await req.json();
    
        await Notification.updateMany(
            { _id: { $in: notificationIds }, userId: session.user.id },
            { $set: { read: true } }
        );
    
        return NextResponse.json({ message: "Notifications marked as read" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating notification" }, { status: 500 });
    }
}
