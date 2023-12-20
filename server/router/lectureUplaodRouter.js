import express from "express";
import { uploadImage, uploadVideo } from "../middleware/multerPhotoVideo.js";
import {
  lectureUploadController,
  lectureGetController,
  getLectureByIdController,
  increaseCredits,
} from "../controller/lectureUploadController.js";
import {
  verifyIfLoggedIn,
  verifyIfTeacher,
  verifyIfStudent,
} from "../middleware/verifyAuthToken.js";
//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------

router.post(
  "/",
  
  uploadVideo.single("lectureUrl"),
  lectureUploadController
);
router.post("/credits/:courseID",  increaseCredits);
router.get("/getlecture",  lectureGetController);
router.get(
  "/getlecturedetails/:id",
  
  getLectureByIdController
);

export default router;
