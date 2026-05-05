<<<<<<< HEAD
import mongoose from "mongoose";
=======
import mongoose from "mongoose"
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
<<<<<<< HEAD
export default Notification;
=======
export default Notification;
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
