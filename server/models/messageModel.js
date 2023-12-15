import mongoose from "mongoose";

const messageSchema =new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", ref:"Teacher" ,ref:"Student"},
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", ref:"Teacher" ,ref:"Student"}],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;