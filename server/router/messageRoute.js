import {Router} from 'express'
import {requireSignIn} from '../middleware/authMiddleware.js'
import {sendMessageController,allMessage } from '../controller/messageController.js'
// import {requireSignIn } from '../middleware/authMiddleware.js'
//-------------- ROUTING OBJECT-----------
const router = Router();

//-------------- ROUTING-----------

router.post('/hi',sendMessageController);
router.get('/:chatId',allMessage)



export default router;