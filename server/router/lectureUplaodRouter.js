import express from 'express'
import {uploadImage, uploadVideo} from "../middleware/multerPhotoVideo.js"
import {lectureUploadController} from '../controller/lectureUploadController.js'

//-------------- ROUTING OBJECT-----------
const router=express.Router();

//-------------- ROUTING-----------

router.post('/',uploadVideo.single('lectureUrl'),lectureUploadController)


export default router;