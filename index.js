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

// Middleware - Allow CORS for all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.options("*", cors()); // Handle preflight requests globally

// Routes
app.use("/Signup-Login", SL);

// Server
const port = 5500;
app.listen(port, () => {
  console.log("Server Started on " + port);
});
