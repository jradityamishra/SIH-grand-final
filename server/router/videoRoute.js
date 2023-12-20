import express from "express";
import {
  getTranscript,
  getQuiz,
  generatePdfAndUpload,
  increaseCredits,
} from "../controller/videoController.js";
import {
  verifyIfLoggedIn,
  verifyIfTeacher,
  verifyIfStudent,
} from "../middleware/verifyAuthToken.js";
//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------
router.post("/credits", increaseCredits);
router.post("/transcript", verifyIfLoggedIn, verifyIfTeacher, getTranscript);
router.get("/quiz/:id", getQuiz);
router.post(
  "/pdf/:id",
  verifyIfLoggedIn,
  verifyIfTeacher,
  generatePdfAndUpload
);
export default router;
