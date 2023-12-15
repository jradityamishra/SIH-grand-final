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
  videoLink: {
    type: String,
    required: true,
  },
  pdfLink: {
    type: String,
  },
  summaryContent: {
    type: String,
  },
  lectureUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
});

const Lecture = mongoose.model("lectureUpload", LectureSchema);

export default Lecture;
