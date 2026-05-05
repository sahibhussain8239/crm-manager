import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
<<<<<<< HEAD
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    assignedAt: {type: Date, default: Date.now},
    role: { type: String, required: true }, // e.g., "photographer", "cinematographer"
    function: {type: String, required: true}, // e.g., "Haldi", "Wedding"
    status: {
        type: String, 
        enum: ["assigned", "started", "in_progress", "completed"],
        default: "assigned"
    },
    eventDate: {type: Date, required: true},
    time: {type: String, required: true},
    venue: {type: String, required: true},
=======
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
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
}, { timestamps: true });

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
export default Assignment;