import {Router} from "express";

import {requireSignIn} from '../middleware/authMiddleware.js'
import {getGroupChatController,
    removeToGroupController,
    deleteGroupChatController,
    addToGroupController,accessChatController,creatGroupChatController,renameGroupChatController} from '../controller/chatController.js'
//-------------- ROUTING OBJECT-----------
const router = Router(); 


//-------------- ROUTING-----------
 router.post('/',requireSignIn,accessChatController)
// router.get('/',requireSignIn,fetchChatController)
 router.post('/group',requireSignIn,creatGroupChatController)
 router.get('/getGroup/:id',requireSignIn,getGroupChatController)
 router.delete('/delete/:id',deleteGroupChatController)
 router.put('/rename',requireSignIn,renameGroupChatController)
 router.put('/groupremove',requireSignIn,removeToGroupController)
 router.put('/groupadd',requireSignIn,addToGroupController)



export default router; 