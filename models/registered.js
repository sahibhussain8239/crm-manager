import mongoose from "mongoose";

const registeredSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    organization: {type: String,required: true},
    password: {type: String,required: true},
    credId: {type: String,required: true},
    createdAt: {type: Date, default: Date.now},
});

const Registered = mongoose.models.Registered || mongoose.model('Registered', registeredSchema);
export default Registered;