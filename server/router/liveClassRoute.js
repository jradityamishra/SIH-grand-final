import {Router} from "express";
import {liveClassController,getliveClassController} from '../controller/liveClassController.js'

//-------------- ROUTING OBJECT-----------
const router = Router();

//-------------- ROUTING-----------

router.post('/:teacherId', liveClassController);
router.get('/get',getliveClassController);

export default router;
