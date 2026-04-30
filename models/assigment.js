import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    crewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
    assignedAt: {type: Date, default: Date.now},
    role: "photographer" | "videographer" | "planner" | "decorator" | "caterer",
    function: {type: String, required: true},
    status: "assigned" | "in_progress" | "completed",
    eventDate: {type:mongoose.Schema.Types.Date, ref:'Event',required: true},
});

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
export default Assignment;