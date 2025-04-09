import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "keepquite";
const saltRounds = 10;

// user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // destructuring the email and password from req body

    let existingUser = await UserModel.findOne({ email }); // check if the user is already exists

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let myPlaintextPassword = password;
    // console.log("plain pass-->", myPlaintextPassword);

    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      // console.log("salt rounds--->", saltRounds);

      if (err) {
        console.log(err);
      } else {
        const userData = new UserModel({ name, email, password: hash });
        // console.log("user data new -->", userData);
        await userData.save();
        res.status(201).json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }); // checking if the user exist

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
    // now comparing the password

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // then generate token with successful login
    let token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      token,
      user: { name: user.name, email: user.email, _id: user._id },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser };
