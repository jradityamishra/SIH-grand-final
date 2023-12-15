import jwt from "jsonwebtoken";
const generateAuthToken = (_id, name, email, role) => {
  return jwt.sign({ _id, name, email, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
export default generateAuthToken;
