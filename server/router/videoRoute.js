import express from "express";
import { getTranscript, getQuiz } from "../controller/videoController.js";

//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------

router.get("/transcript/:id", getTranscript);
router.get("/quiz/", getQuiz);
export default router;
