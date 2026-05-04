import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventId: {type: String, required: true, unique: true},
    clientName: {type: String, required: true},
    eventDate: {type: Date, required: true},
    eventType: {type: String, required: true},
    status: "booked" | "assigned" | "in_progress" | "completed",
    venues: {type: String},
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;