import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from './routes/userRouter.js';
import courseRouter from './routes/courseRouter.js';
import profileRouter from './routes/profileRouter.js';
import roadmapRouter from './routes/roadmapRouter.js';
const app=express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}));
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api/profile", profileRouter);
app.use("/api/roadmap", roadmapRouter);


connectDB();
app.listen(5000,()=>{
    console.log("server is running at http://localhost:5000");
})