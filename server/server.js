import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";

dotenv.config(); // to access the enviroment variables

const app = express(); //created the express server

app.use(
  cors({
    origin: "http://localhost:5173", // frontend port
    credentials: true,
  })
);
//used third-party middleware to enable the cross origin resource sharing

app.use(express.json()); // used in-built middleware for json-parser to post the data through http requests

const PORT = process.env.PORT || 8080;

// sample route

app.get("/", (req, res) => {
  res.send("GreenChamps API is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/challenges", challengeRoutes);
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
