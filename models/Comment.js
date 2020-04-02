import mongoose from "mongoose";

const CommentSchima = new mongoose.Schema({
  twxt: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now //mongoose가 자동으로 () 실행
  }
});

const model = mongoose.model("Comment", CommentSchima);
export default model;
