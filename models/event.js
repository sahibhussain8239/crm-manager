import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventId: {type: String, required: true, unique: true},
    clientName: {type: String, required: true},
    eventDate: {type: Date, required: true},
    time: {type: String},
    eventType: {type: String, required: true},
    status: {
<<<<<<< HEAD
        type: String, 
        enum: ["waiting", "booked", "assigned", "in_progress", "completed"],
        default: "waiting"
=======
        type: String,
        enum: ['waiting', 'booked', 'assigned', 'in_progress', 'completed'],
        default: 'waiting'
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
    },
    venues: {type: String},
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    managerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;