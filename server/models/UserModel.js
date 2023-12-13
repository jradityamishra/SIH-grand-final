import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        phoneNumber: {
          type: String,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },  
      },{ timestamps: true }
      
);

const User=mongoose.models.users||mongoose.model('users',userSchema);
export default User;