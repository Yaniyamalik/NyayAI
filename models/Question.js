import mongoose from "mongoose";
import User from "./User";
const questionSchema= new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},{timestamps:true})

export default mongoose.models.Question || mongoose.model("Question", questionSchema);
