import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // to access the enviroment variables

const app = express(); //created the express server

app.use(cors()); //used third-party middleware to enable the cross origin resource sharing

app.use(express.json()); // used in-built middleware for json-parser to post the data through http requests

const PORT = process.env.PORT || 6000;

// sample route

app.get("/", (req, res) => {
  res.send("GreenChamps API is running!");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
