import {Router} from "express";
import {registerController,loginController,getUser,feedback} from "../controller/authController.js"
import {requireSignIn} from '../middleware/authMiddleware.js'
//-------------- ROUTING OBJECT-----------
const router = Router();

//-------------- ROUTING-----------

router.post('/register',registerController);
router.post('/login',loginController)
router.get('/getuser',requireSignIn,getUser);

//--------------FEEDBACK ROUTING-----------
router.post('/:teacherId',feedback)



export default router;
