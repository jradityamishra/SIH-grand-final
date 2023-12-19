

import liveclass from '../models/liveClassModel.js'


export const liveClassController=async(req,resp)=>{
    const {subject,Time,description,joiningLink}=req.body;
    console.log(req.body)
    console.log(req.params.teacherId)
    //by doing this i get only date not time
    const formattedDate=  new Date().toISOString().split('T')[0]
   try{
    const data=await liveclass({
        subject:subject,
        Timing:Time,
        description:description,
        Date:formattedDate,
        joiningLink:joiningLink,
        teacherId:req.params.teacherId
    }).save();
    console.log(data)
    if(data){
        resp.status(200).send({
            success:true,
            message:"live class register Successfullt",
            data
        })
    }

    console.log(data);
   }catch(error){
    resp.status(500).send({
        success:false,
        message:error.message
    })
   }
}


// =============GET DATA FOR STUDENT===========


export const getliveClassController=async(req,resp)=>{
    const formattedDate=  new Date().toISOString().split('T')[0]

    try{
        const data=await liveclass.find({
            Date:{$eq:formattedDate}})
            
           
        if(data){
            resp.status(200).send({
                success:true,
                message:"we get all data",
                data
            })
        }
    }catch(error){
        resp.status(500).send({
            success:false,
            message:error.message
        })
    }
}