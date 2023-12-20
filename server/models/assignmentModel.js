import mongoose from "mongoose";

const assinmentModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptionFile: {
      type: String,
      // required: true,
    },
    deadlineDays: {
      type: Date,
    },
    description:{
      type:String,
      required:true
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
