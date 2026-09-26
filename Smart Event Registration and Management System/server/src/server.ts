
import connectDB from "./config/database.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use("/api/auth", authRoutes);
// Test route
app.get("/", (_req, res) => {
  res.json({
    message: "Smart Event Registration API is running",
  });
});
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});