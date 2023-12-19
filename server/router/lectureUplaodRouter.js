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
  verifyIfLoggedIn,
  verifyIfTeacher,
  uploadVideo.single("lectureUrl"),
  lectureUploadController
);
router.post("/credits/:courseID", verifyIfLoggedIn, increaseCredits);
router.get("/getlecture", verifyIfLoggedIn, lectureGetController);
router.get(
  "/getlecturedetails/:id",
  verifyIfLoggedIn,
  getLectureByIdController
);

export default router;
