import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import Organization from "@/models/Organization";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, organizationName } = await req.json();

    if (!name || !email || !password || !organizationName) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 400 }
      );
    }

    // Create Organization
    const organization = await Organization.create({ name: organizationName });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User (Sales Admin)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'sales_admin',
      organizationId: organization._id,
    });

    return NextResponse.json(
      { message: "Registration successful." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
