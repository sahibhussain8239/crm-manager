import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
    assignedAt: {type: Date, default: Date.now},
    role: {type: String, required: true},
    function: {type: String, required: true},
    status: {
        type: String,
        enum: ['assigned', 'started', 'in_progress', 'completed'],
        default: 'assigned'
    },
    eventDate: {type: Date, required: true},
    time: {type: String, required: true},
    venue: {type: String, required: true},    
}, { timestamps: true });

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
export default Assignment;