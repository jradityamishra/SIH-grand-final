import mongoose from "mongoose";

const liveClassModel = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: "No message from Your Mentor Side",
  },
  joiningLink: {
    type: String,
    default: "https://meet.google.com/uso-ojyo-bze",
  },
  feedback: {
    presentationStyle: {
      type: Number,
      default: 0, // Set your default value here
    },
    communication: {
      type: Number,
      default: 0,
    },
    engagement: {
      type: Number,
      default: 0,
    },
    pace: {
      type: Number,
      default: 0,
    },
    organization: {
      type: Number,
      default: 0,
    },
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const liveclass = mongoose.model("liveclass", liveClassModel);

export default liveclass;
