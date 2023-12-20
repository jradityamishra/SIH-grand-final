import express from "express";
import { uploadAssignment } from "../middleware/multerAssigment.js";
import {
  assignmentUploadController,
  assignmentGetController,
} from "../controller/assignmentController.js";
import {
  verifyIfStudent,
  verifyIfLoggedIn,
  verifyIfTeacher,
} from "../middleware/verifyAuthToken.js";

//-------------- ROUTING OBJECT-----------
const router = express.Router();

//-------------- ROUTING-----------

router.post(
  "/",
  verifyIfLoggedIn,
  verifyIfStudent,
  uploadAssignment.single("assignmentPdf"),
  assignmentUploadController
);
router.get(
  "/assignmentGet",
  verifyIfLoggedIn,
  verifyIfStudent,
  assignmentGetController
);

export default router;
