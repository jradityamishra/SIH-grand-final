import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
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
  summaryLink: {
    type: String,
  },
  lectureUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Lecture = mongoose.model("lectureUpload", LectureSchema);

export default Lecture;
