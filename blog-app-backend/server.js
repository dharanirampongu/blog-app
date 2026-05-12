import exp from 'express'
import {connect} from 'mongoose';
import {config} from 'dotenv'
import {userApp} from './APIs/UserAPI.js'
import {commonApp} from './APIs/CommonAPI.js'
import {authorApp} from './APIs/AuthorAPI.js'
import {adminApp} from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
config()
//create express app
const app=exp()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(cookieParser())
//body parser middleware
app.use(exp.json())
//path level middleware
app.use("/user-api",userApp)
app.use("/author-api",authorApp)
app.use("/admin-api",adminApp)
app.use("/auth",commonApp)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", version: "1.0.2", timestamp: new Date().toISOString() });
});

//connect to db
const connectDB=async()=>{
    try{
        await connect(process.env.DB_URL)
        console.log("DB connected")
        const port=process.env.PORT || 4000
   app.listen(port,()=>console.log(`server listening on ${port}`))
    }catch(err){
        console.log("err in db connection:", err.message)
        console.log("DB_URL used:", process.env.DB_URL ? "SET" : "NOT SET")
    }
}
connectDB()

//to handle inavlid path
app.use((req,res,next)=>{
    console.log(req.url)
    res.status(404).json({message:`${req.url} is invalid`})
})

//to handle error
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", error: message });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format", error: message });
  }

  // Handle other specific errors if needed
  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal Server Error" : message,
    error: message,
    details: err.stack, // 👈 ADD stack trace for debugging
  });
});

