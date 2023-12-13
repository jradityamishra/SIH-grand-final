import express from 'express'
import {uploadAssignment} from '../middleware/multerAssigment.js'
import {assignmentUploadController,assignmentGetController} from "../controller/assignmentController.js"

//-------------- ROUTING OBJECT-----------
const router=express.Router();

//-------------- ROUTING-----------

router.post('/',uploadAssignment.single('assignmentPdf'),assignmentUploadController)
router.get('/assignmentGet',assignmentGetController)


export default router;