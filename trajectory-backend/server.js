import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import protectedRouter from "./routes/protectedRouter.js";
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
app.use("/api", protectedRouter);

app.get('/',(req,res)=>{
    res.json("hello");
})

connectDB();
app.listen(5000,()=>{
    console.log("server is running at http://localhost:5000");
})