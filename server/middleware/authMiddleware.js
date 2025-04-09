import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "keepquite";

const protect = async (req, res, next) => {
  let token;

  // check if the token is present in header or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //   console.log("token--->", token);

      const decoded = jwt.verify(token, JWT_SECRET_KEY);

      req.user = await UserModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
