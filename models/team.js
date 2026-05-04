import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    crewId: {type: String, required: true},
    crewemail: {type: String, required: true},
    crewName: {type: String, required: true},
    role: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export default Team;