import jwt from "jsonwebtoken";

export const verifyIfLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token)
      return res.status(403).send("A token is required for authentication");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized.Invalid Token!");
    }
  } catch (err) {
    next(err);
  }
};
export const verifyIfStudent = (req, res, next) => {
  try {
    if (req.user && req.user.role === "student") {
      next();
    } else {
      res.status(401).send("Unauthorized! Student required");
    }
  } catch (err) {
    next(err);
  }
};
export const verifyIfTeacher = (req, res, next) => {
  try {
    if (req.user && req.user.role === "teacher") {
      next();
    } else {
      res.status(401).send("Unauthorized! Teacher required");
    }
  } catch (err) {
    next(err);
  }
};
