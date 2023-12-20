import mongoose from "mongoose";
import liveclass from "./liveClassModel.js";

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String, // 'national', 'international', 'state', etc.
    required: true,
  },
  certificateUrl: {
    type: String,
    required: true,
  },
});

const teacherAnalysisSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  aggregateFeedback: {
    type: Object, // Change the type to Object
    default: {}, // Default to an empty object
  },
  achievements: {
    type: [achievementSchema],
    default: [],
  },
  //   experience: {
  //     type: Number,
  //     default: 0,
  //   },
  degree: {
    type: String,
    default: "",
  },
});

teacherAnalysisSchema.index({ teacher: 1, month: 1 }, { unique: true });

teacherAnalysisSchema.statics.calculateAggregateFeedback = async function (
  teacherId,
  month
) {
  try {
    const liveClasses = await liveclass.find({
      teacherId,
    });

    if (liveClasses.length === 0) {
      return {
        presentationStyle: 0,
        communication: 0,
        engagement: 0,
        pace: 0,
        organization: 0,
      };
    }

    // Generate random averages for each parameter
    const randomAverages = {
      presentationStyle: Math.random() * 5, // Adjust the range as needed
      communication: Math.random() * 5,
      engagement: Math.random() * 5,
      pace: Math.random() * 5,
      organization: Math.random() * 5,
    };

    const aggregateFeedback = {
      presentationStyle: randomAverages.presentationStyle,
      communication: randomAverages.communication,
      engagement: randomAverages.engagement,
      pace: randomAverages.pace,
      organization: randomAverages.organization,
    };

    return aggregateFeedback;
  } catch (error) {
    console.error("Error calculating aggregate feedback:", error);
    throw error;
  }
};

const TeacherAnalysisModel = mongoose.model(
  "TeacherAnalysis",
  teacherAnalysisSchema
);

export default TeacherAnalysisModel;
