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
      subjects,
      levelOfEducation,
      about,
      studentClass,
      board,
    } = req.body;

    if (!name || !email || !password || !role) {
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
        subjects,
        levelOfEducation,
        about,
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
      }).save();
    }
    resp
      .cookie(
        "access_token",
        generateAuthToken(user._id, user.name, user.email),
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
        generateAuthToken(user._id, user.name, user.email),
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

// /api/user?search=

export const getUser = async (req, resp) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { class: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find({ ...keyword, _id: { $ne: req.user._id } }); //except this user retun me all id

  resp.send(users);
};
