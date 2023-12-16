import express from "express";
import { uploadImage, uploadVideo } from "../middleware/multerPhotoVideo.js";
import {
  lectureUploadController,
  lectureGetController,
  getLectureByIdController,
} from "../controller/lectureUploadController.js";

//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------

router.post("/", uploadVideo.single("lectureUrl"), lectureUploadController);
router.get("/getlecture", lectureGetController);
router.get("/getlecturedetails/:id", getLectureByIdController);

export default router;
