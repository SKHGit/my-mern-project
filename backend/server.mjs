import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb://mongo:27017/mern-person")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch((err) => console.log(err));
