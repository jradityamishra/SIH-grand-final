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
<<<<<<< HEAD
  videoLink: {
    type: String,
  },
  pdfLink: {
    type: String,
  },
  summaryContent: {
    type: String,
  },
=======
  pdfLink: {
    type: String,
  },
  summaryContent:
  {
    type:String
  },

>>>>>>> jyotiradityamishra
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
