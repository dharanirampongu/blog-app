import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { userApp } from './APIs/UserAPI.js';
import { commonApp } from './APIs/CommonAPI.js';
import { authorApp } from './APIs/AuthorAPI.js';
import { adminApp } from './APIs/AdminAPI.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();
const app = exp();

app.use(cors({
  origin: ["http://localhost:5173", "https://blog-app-lqsk.vercel.app"],
  credentials: true
}));
app.use(cookieParser());
app.use(exp.json());

app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);

// Connect to DB once per cold start
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await connect(process.env.DB_URL);
    isConnected = true;
    console.log("DB connected");
  } catch (err) {
    console.error("err in db connection", err);
  }
};
connectDB();

// Invalid path handler
app.use((req, res) => {
  res.status(404).json({ message: `${req.url} is invalid` });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  res.status(500).json({ message: "error occurred", error: "server side error" });
});

export default app;
