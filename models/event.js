import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventId: {type: String, required: true, unique: true},
    clientName: {type: String, required: true},
    eventDate: {type: Date, required: true},
    time: {type: String},
    eventType: {type: String, required: true},
    status: {
        type: String, 
        enum: ["waiting", "booked", "assigned", "in_progress", "completed"],
        default: "waiting"
    },
    venues: {type: String},
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    managerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;