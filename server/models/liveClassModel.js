import mongoose from 'mongoose'

const liveClassModel=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    Timing:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        default:"No message from Your Mentor Side"
    },
    joiningLink:{
        type:String,
        default:"https://meet.google.com/uso-ojyo-bze",
        // required:true
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    }

});


const liveclass=mongoose.model("liveclass",liveClassModel)

export default liveclass;
