import mongoose from "mongoose"

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return

<<<<<<< HEAD
  await mongoose.connect("mongodb://127.0.0.1:27017/CRM_manager")
=======
  await mongoose.connect("mongodb://127.0.0.1:27017/CRM_Mnager")
>>>>>>> d5779b86ea80580a638e769fe0b9778f3f471a81
}

export default connectDB