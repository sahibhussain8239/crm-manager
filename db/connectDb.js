import mongoose from "mongoose"

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return

  await mongoose.connect("mongodb://127.0.0.1:27017/CRM_Mnager")
}

export default connectDB