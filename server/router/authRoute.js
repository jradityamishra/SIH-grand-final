import {Router} from "express";
import {registerController,loginController} from "../controller/authController.js"

//-------------- ROUTING OBJECT-----------
const router = Router(); 


//-------------- ROUTING-----------

router.post('/register',registerController);
router.post('/login',loginController)


export default router; 