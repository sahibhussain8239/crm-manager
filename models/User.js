import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String, 
        required: true,
        enum: ['sales_admin', 'production_admin', 'manager', 'team_member'],
    },
    OrganizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    createdAt: {type: Date, default: Date.now},
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;