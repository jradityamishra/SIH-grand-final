import {Router} from "express";
import {liveClassController,getliveClassController,ratingController} from '../controller/liveClassController.js'

//-------------- ROUTING OBJECT-----------
const router = Router();

//-------------- ROUTING-----------

router.post('/:teacherId', liveClassController);
router.get('/get',getliveClassController);
router.post("/rating/:teacherId",ratingController);
export default router;
