import mongoose from "mongoose";

const lectureUploadModel = new mongoose.Schema(
   {
    title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  lectureUrl: {
    type: String,
    required: true,
  }
    
}
    
);

const User = mongoose.model("lectureUpload", lectureUploadModel);

export default User; 