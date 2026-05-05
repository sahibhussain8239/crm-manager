import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);
export default Organization;
=======
    name: {type: String,required: true},
    createdAt: {type: Date, default: Date.now},
});

const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);
export default Organization;
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
