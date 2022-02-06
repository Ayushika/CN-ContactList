/** @format */

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import UserRoutes from "./routes/UserRoutes";
import path from "path";

const app = express();
dotenv.config();

//const csrfProtection = csrf({ cookie: true });

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// middleware
app.use(express.json({ limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/user", UserRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(path.join(__dirname, "../"), "/frontend/build")),
  ); // set static folder
  //returning frontend for any route other than api
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(
        path.join(__dirname, "../"),
        "frontend",
        "build",
        "index.html",
      ),
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// connecting to the database
connectDB();

// listen on port
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Running ${process.env.NODE_ENV} mode on port 5000`),
);