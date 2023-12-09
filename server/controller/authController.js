import User from "../models/UserModel.js"
import { hashPassword,comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken"




//-------------- REGISTER USER-----------




export const registerController=async(req,resp)=>{
    try {
        const { firstName,lastName, email, password, phoneNumber } = req.body;
        //validation
        if (!firstName) {
          return resp.send({ message: "name is required" });
        }
        if (!lastName) {
            return resp.send({ message: "lastname is required" });
          }
        if (!email) {
          return resp.send({ message: "email is required" });
        }
        if (!password) {
          return resp.send({ message: "password is required" });
        }
        if (!phoneNumber) {
          return resp.send({ message: "Phone no is required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format!" });
        }
    
        //check user
        const existuser = await User.findOne({ email });
        //existing user
        if (existuser) {
          return resp.status(200).send({
            sucess: false,
            message: "already Register please login",
          });
        }
    
        //register user
        const hassedpassword = await hashPassword(password);
        //save
        const user = await new User({
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hassedpassword,
        }).save();
        resp.status(200).send({
          sucess: true,
          message: "user register sucessfully",
          user,
        });
      } catch (error) {
        console.log(error);
        resp.status(500).send({
          sucess: false,
          message: "Error in registeration",
          error,
        });
      }
}


//-------------- LOGIN USER-----------


export const loginController = async (req, resp) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return resp.status(404).send({
          success: false,
          message: "invalid email or password",
        });
      }
      //check user
      const user = await User.findOne({ email });
      if (!user) {
        return resp.status(404).send({
          success: false,
          message: "User not found",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return resp.status(200).send({
          sucess: false,
          message: "Invalid Password!",
        });
      }
      //create token
      const token = await JWT.sign({ _id: user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email }, process.env.JWT_SECRET_KEY, {expiresIn: "7d", });
      resp.cookie("access token",token).status(200).send({
          sucess:true,
          message:"login sucesssfully",
          user:{
              name:user.name,
              email:user.email,
              phone:user.phone,
              address:user.address,
              role:user.role,
          },
          token
      })
    } catch (error) {
      console.log(error);
      resp.status(500).send({
        sucess: false,
        message: "Error in login",
        error,
      });
    }
  };
  