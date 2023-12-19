import {Router} from 'express'
import {requireSignIn} from '../middleware/authMiddleware.js'
import {sendMessageController,allMessage } from '../controller/messageController.js'
// import {requireSignIn } from '../middleware/authMiddleware.js'
//-------------- ROUTING OBJECT-----------
const router = Router();

//-------------- ROUTING-----------

router.post('/hi',requireSignIn,sendMessageController);
router.get('/:chatId',requireSignIn,allMessage)



export default router;