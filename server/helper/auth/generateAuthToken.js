import { config } from "dotenv";
import jwt from "jsonwebtoken";
const generateAuthToken = (_id, name, email) => {
  return jwt.sign({ _id, name, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
export default generateAuthToken;
