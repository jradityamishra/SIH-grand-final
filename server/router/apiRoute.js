import express from "express";
import messageRoute from "./messageRoute.js";
import liveClass from "./liveClassRoute.js";
import auth from "./authRoute.js";
import lectureUpload from "./lectureUplaodRouter.js";
import assignment from "./assignmentUpload.js";
import videoRoute from "./videoRoute.js";
import chat from './chatRoutes.js'
import { getAnalysis } from "../controller/analysisController.js";
const app = express();
app.use("/auth", auth);
app.use("/lectureUpload", lectureUpload);
app.use("/assignmentUpload", assignment);
app.use("/message", messageRoute);
app.get("/analysis/:id", getAnalysis);
app.use("/liveclass", liveClass);
app.use("/chat", chat);
app.use("/video", videoRoute);
export default app;
getAnalysis