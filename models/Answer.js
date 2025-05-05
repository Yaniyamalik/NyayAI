import mongoose from "mongoose";
import User from "./User";
const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerText: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // must match exactly the model name
  },
  
   
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);
export default Answer;
