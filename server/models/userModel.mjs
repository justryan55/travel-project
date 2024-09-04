import express from "express";
import { Schema, mongoose } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    countries_visited: [{ type: String }],
    bio: { type: String, default: "Add a bio" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
