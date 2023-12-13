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
    
  }
    
}, { timestamps: true } 
    
);

const assignment = mongoose.model("assignmentUpload", assinmentModel);

export default assignment; 