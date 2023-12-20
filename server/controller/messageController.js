import mongoose from 'mongoose';
import Message from '../models/messageModel.js'
import Chat from '../models/chatModel.js';
import {User} from '../models/UserModel.js'


export const sendMessageController=async(req,resp)=>{

    const { content, chatId,user_id } = req.body;
    //const id="65780139af4dbfd592ca7048"
    
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return resp.status(400).send({
      sucess:false,
      message:"tumhara data match nhi kar raha"
    })
  }

  var newMessage = {
    sender: user_id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    resp.json(message);
  } catch (error) {
    resp.status(400);
    throw new Error(error.message);
  }
}

export const allMessage=async(req,resp)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name  email")
          .populate("chat");
        resp.json(messages);
      } catch (error) {
        resp.status(400);
        throw new Error(error.message);
      }
}