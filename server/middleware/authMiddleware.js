import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes
export const requireSignIn = async (req, resp, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    ); //VERIFY USE FOR COMPARE TOKEN
   req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};