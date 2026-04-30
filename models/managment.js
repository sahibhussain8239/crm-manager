import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    role: "sales_admin" | "production_admin" | "manager-team_creator" | "manager-tasks_leader" | "team_member",
    credId: {type: String,required: true},
    createdAt: {type: Date, default: Date.now},
});

const Management = mongoose.models.Management || mongoose.model('Management', roleSchema);
export default Management;