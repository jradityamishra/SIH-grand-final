import express from "express";
import {
  getTranscript,
  getQuiz,
  generatePdfAndUpload,
  increaseCredits,
} from "../controller/videoController.js";

//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------
router.post("/credits", increaseCredits);
router.post("/transcript", getTranscript);
router.get("/quiz/:id", getQuiz);
router.post("/pdf/:id", generatePdfAndUpload);
export default router;
