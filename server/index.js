import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieparser from 'cookie-parser'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'
import colors from "colors";
import connection from "./database/db.js";
import auth from "./router/authRoute.js"
import lectureUpload from './router/lectureUplaodRouter.js'
import assignment from './router/assignmentUpload.js'
import chat from './router/chatRoutes.js'
import apiRoute from "./router/apiRoute.js"
import messageRoute from './router/messageRoute.js'
import liveClass from './router/liveClassRoute.js'
import path, { dirname } from "path";
//configure env
dotenv.config()
const PORT = process.env.PORT||5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//rest object
const app=express();
//MIDDLEWARE
app.use(cors());
app.use(cookieparser() )
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

//ROUTE
app.use('/api/v1/auth',auth);
app.use('/api/v1/lectureUpload',lectureUpload);
app.use('/api/v1/assignmentUpload',assignment);
app.use('/api/v1/chat',chat);
app.use('/api/v1/message',messageRoute);
app.use("/api/v1", apiRoute);
app.use("/api/v1/liveclass",liveClass);

// DATABASE CONNECTION
connection();


//API 
app.get("/", async (req, res, next) => {
    res.json({ message: "API running" });
  });
  
  
  
  // MIDDLEWAREs TO HANDLE ERRORS
  app.use((err, req, res, next) => {
    console.error(err);
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  });



app.listen(PORT,()=>{
    console.log(`SERVER RUNNING AT PORT ${PORT}`.bgBlue.white)
})

