import {Router} from "express";

import {requireSignIn} from '../middleware/authMiddleware.js'
import {getGroupChatController,
    removeToGroupController,
    deleteGroupChatController,
    addToGroupController,accessChatController,creatGroupChatController,renameGroupChatController} from '../controller/chatController.js'
//-------------- ROUTING OBJECT-----------
const router = Router(); 


//-------------- ROUTING-----------
 router.post('/',accessChatController)
// router.get('/',requireSignIn,fetchChatController)
 router.post('/group',creatGroupChatController)
 router.get('/getGroup/:id',getGroupChatController)
 router.delete('/delete/:id',deleteGroupChatController)
 router.put('/rename',renameGroupChatController)
 router.put('/groupremove',removeToGroupController)
 router.put('/groupadd',addToGroupController)



export default router; 