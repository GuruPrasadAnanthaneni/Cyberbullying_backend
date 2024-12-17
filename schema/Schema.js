const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
  },
  {
    collection: "Signup-Login",
  }
);

module.exports = mongoose.model("Signup-Login", Schema);
