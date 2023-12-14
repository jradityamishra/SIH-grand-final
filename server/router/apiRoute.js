import express from "express";

import auth from "./authRoute.js";
import lectureUpload from "./lectureUplaodRouter.js";
import assignment from "./assignmentUpload.js";
import videoRoute from "./videoRoute.js";
const app = express();
app.use("/auth", auth);
app.use("/lectureUpload", lectureUpload);
app.use("/assignmentUpload", assignment);
app.use("/video", videoRoute);
export default app;
