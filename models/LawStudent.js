import { number } from "framer-motion";
import mongoose from "mongoose";

const lawstudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  languages: [{ type: String }],
  qualificaation: [{ type: String }],
  university:[{type:String}],
  
  gender: { type: String },
  age: { type: Number },
  role: { type: String, default: "law-student" },
  bio: { type: String },
  profilePhoto: { type: String },
  availability: { type: String },
  answers:{type:String},
  rating:[{type:String}],
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lawstudent || mongoose.model("Lawstudent", lawstudentSchema);
