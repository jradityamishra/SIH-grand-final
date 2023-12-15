import Chat from "../models/chatModel.js"
import {User} from "../models/UserModel.js"


export const accessChatController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select:"firstName LastName email"
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

export const fetchChatController = async (req, resp) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
   .populate("users","-password")
    .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({updatedAt:-1})
      .then(async (result)=>{
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select:"firstName LastName email"
      
        });
        resp.status(200).send(result);
      })
  } catch (error) {
    resp.status(500).send({
      success:false,
      message:error.message
    })
  }
}

export const creatGroupChatController=async(req,resp)=>{
  if (!req.body.users || !req.body.name) {
    return resp.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return resp
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.users);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    resp.status(200).json(fullGroupChat);
  } catch (error) {
    resp.status(400);
    throw new Error(error.message);
  }
}

// get group
export const getGroupChatController=async(req,resp)=>{
const groupAdmin=req.params.id;
console.log(groupAdmin)

try{
  const data=await Chat.find({
    groupAdmin: groupAdmin,
  })
  console.log(data);
  resp.send(data);
}catch(error){
console.log(error)
resp.status(501).send({
  success:false,
  message:error.message
})
}
}

export const renameGroupChatController=async(req,resp)=>{
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    resp.status(404).send({
      success:false,
      message:"chat not found"
    })
    
  } else {
    resp.json(updatedChat);
  }
}

// delete group

export const deleteGroupChatController=async(req,resp)=>{
  const groupAdmin=req.params.id;
 console.log(groupAdmin)
 try{
  const deletedGroup = await Chat.findByIdAndDelete( groupAdmin );

    if (!deletedGroup) {
      return resp.status(404).json({ success: false, message: 'Group not found' });
    }

    resp.status(200).send({ success: true, message: 'Group deleted successfully', deletedGroup });
 }catch(error){
  console.error(error);
  resp.status(500).json({ success: false, message: error.message });

 }
}

export const addToGroupController=async(req,resp)=>{
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    resp.status(404);
    throw new Error("Chat Not Found");
  } else {
    resp.json(added);
  }
}

export const removeToGroupController=async(req,resp)=>{
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    resp.status(404);
    throw new Error("Chat Not Found");
  } else {
    resp.json(removed);
  }
}