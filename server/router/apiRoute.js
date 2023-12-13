import express from "express";

import auth from "./authRoute.js";
import lectureUpload from "./lectureUplaodRouter.js";
import assignment from "./assignmentUpload.js";
const app = express();
app.use("/auth", auth);
app.use("/lectureUpload", lectureUpload);
app.use("/assignmentUpload", assignment);
export default app;
