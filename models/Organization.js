import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {type: String,required: true},
    createdAt: {type: Date, default: Date.now},
});

const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);
export default Organization;