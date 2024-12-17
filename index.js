const mongoose = require("mongoose");
const express = require("express");
const SL = require("./routes/SignupLoginroutes");
const cors = require("cors");

const app = express();

// MongoDB Connection
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://guru:guru@cluster0.oowiasj.mongodb.net/CyberBullying"
);
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
});
db.on("error", () => {
  console.log("Database not Connected");
});

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://billybotfrontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.options("*", cors()); // Handle preflight requests

// Routes
app.use("/Signup-Login", SL);

// Server
const port = 5500;
app.listen(port, () => {
  console.log("Server Started on " + port);
});
