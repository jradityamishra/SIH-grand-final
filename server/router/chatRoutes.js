import {Router} from "express";

import {requireSignIn} from '../middleware/authMiddleware.js'
import {removeToGroupController,addToGroupController,accessChatController,fetchChatController,creatGroupChatController,renameGroupChatController} from '../controller/chatController.js'
//-------------- ROUTING OBJECT-----------
const router = Router(); 


//-------------- ROUTING-----------
 router.post('/',requireSignIn,accessChatController)
 router.get('/',requireSignIn,fetchChatController)
 router.post('/group',requireSignIn,creatGroupChatController)
 router.put('/rename',requireSignIn,renameGroupChatController)
 router.put('/groupremove',requireSignIn,removeToGroupController)
 router.put('/groupadd',requireSignIn,addToGroupController)



export default router; 