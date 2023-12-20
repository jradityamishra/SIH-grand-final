import { User, Teacher, Student } from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../helper/auth/authHelper.js";
import generateAuthToken from "../helper/auth/generateAuthToken.js";
// import {Student} from "../models/UserModel.js";

//-------------- REGISTER USER-----------

export const registerController = async (req, resp, next) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      role,
      yearsOfExperience,
      subject,
      levelOfEducation,
      about,
      studentClass,
      teacherClass,
      coursesTaught,
      board,
      school,
    } = req.body;

    if (!name || !email || !password || !role || !school) {
      return resp.status(400).send({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return resp.status(400).json({ error: "Invalid email format!" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return resp.status(200).send({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Register the user
    const hashedPassword = await hashPassword(password);

    let user;

    if (role === "teacher") {
      user = await new Teacher({
        name,
        email,
        password: hashedPassword,
        dob,
        role,
        yearsOfExperience,
        subjectsTaught: subject,
        levelOfEducation,
        teacherClass,
        coursesTaught,
        about,
        school,
      }).save();
    } else if (role === "student") {
      user = await new Student({
        name,
        email,
        role,
        password: hashedPassword,
        dob,
        studentClass,
        board,
        school,
      }).save();
    }
    console.log(user);
    resp
      .cookie(
        "access_token",
        generateAuthToken(user._id, user.name, user.email, user.role),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      )
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      });
  } catch (error) {
    next(error);
  }
};

//-------------- LOGIN USER-----------

export const loginController = async (req, resp) => {
  console.log(req.body);
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
        success: false,
        message: "Invalid Password!",
      });
    }
    resp
      .cookie(
        "access_token",
        generateAuthToken(user._id, user.name, user.email, user.role),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      )
      .status(201)
      .send({
        success: true,
        message: "login successfully",
        user,
      });
  } catch (error) {
    next(error);
  }
};

// /api/user?search=

export const getUser = async (req, res) => {
  const {id}=req.body;
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { class: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne:id} });
  res.send(users);
};


export const ratingController=async(req,resp)=>{
    const {rating}=req.body;
  try{
    const data=await Teacher.findByIdAndUpdate(req.params.teacherId,
      {feedback:rating})

      if(data){
        resp.status(200).send({
          success:true,
          message:false,
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