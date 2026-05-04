"use server"
import connectDB from '@/db/connectDb'
import Registered from '@/models/registered'
import Event from '@/models/event'

export const fetchorg = async (organization) => {
    await connectDB();
    // find the organization in the database and return the details without rubish details
    let o = await Registered.findOne({ organization: organization });
    let org = o.toObject({ flattenObjects: true });
    return org;
}

export const fetchevents = async (clientName) => {
    await connectDB();
    // find the booked events in the database and return the details without rubish details
    let e = (await Event.find({ clientName: clientName, status: "booked" })).sort({ eventDate: 1 }).lean();
    return e;
}