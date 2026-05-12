import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from './routes/userRouter.js';
import courseRouter from './routes/courseRouter.js';
const app=express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", courseRouter);

app.get('/',(req,res)=>{
    res.json("hello");
})

connectDB();
app.listen(5000,()=>{
    console.log("server is running at http://localhost:5000");
})