/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import UserRoutes from "./routes/UserRoutes";

const app = express();
dotenv.config();

app.use(cors());

// middleware
app.use(express.json());

app.use("/api/user", UserRoutes);

// connecting to the database
connectDB();

// listen on port
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Running ${process.env.NODE_ENV} mode on port 5000`),
);
