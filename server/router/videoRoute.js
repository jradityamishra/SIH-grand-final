import express from "express";
import {
  getTranscript,
  getQuiz,
  generatePdfAndUpload,
} from "../controller/videoController.js";

//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------

router.get("/transcript/:id", getTranscript);
router.get("/quiz/:id", getQuiz);
router.post("/pdf/:id", generatePdfAndUpload);
export default router;
