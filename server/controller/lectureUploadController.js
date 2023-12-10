import { postObject } from "../helper/s3/S3lectureUpload.js";
import lectureUploadModel from '../models/lectureUploadModel.js'
export const lectureUploadController=async(req,resp)=>{
   const {title,description}=req.body;
     const lectureUrl=req.file
     const videoname=req.file.originalname;

   try{
     const get = await postObject(videoname, lectureUrl);
     if(get){
        const upload=await lectureUploadModel({
            title:title,
            description:description,
            lectureUrl:get
        }).save()

        if(upload){
            resp.status(201).send({
                success:true,
                message:"lecture uploaded done",
                upload
            })
         }
     }
    
     
   }catch(error){
    console.log(error)
    resp.status(501).send({
        success:false,
        message:error.message,
    })
   }
}