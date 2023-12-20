import mongoose from "mongoose";

const assinmentModel = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    assignmentPdf: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
    },
    assignmentCredits: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        marks: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const assignment = mongoose.model("assignmentUpload", assinmentModel);

export default assignment;
