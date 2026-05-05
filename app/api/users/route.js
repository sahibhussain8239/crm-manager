import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // Extract role query parameter
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    
    let query = { organizationId: session.user.organizationId };
    if (role) {
      query.role = role;
    }

    const users = await User.find(query).select('-password');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, email, password, role } = await req.json();
    
    // Authorization check
    if (session.user.role === 'sales_admin' && role !== 'production_admin') {
      return NextResponse.json({ message: "Sales Admin can only create Production Admins" }, { status: 403 });
    }
    if (session.user.role === 'production_admin' && role !== 'manager') {
      return NextResponse.json({ message: "Production Admin can only create Managers" }, { status: 403 });
    }
    if (session.user.role === 'manager' && role !== 'team_member') {
      return NextResponse.json({ message: "Manager can only create Team Members" }, { status: 403 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ message: "Email already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      organizationId: session.user.organizationId
    });

    return NextResponse.json({ message: "User created successfully", user: { id: newUser._id, name, email, role } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
