import mongoose from "mongoose";

const CommentSchima = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now, //mongoose가 자동으로 () 실행
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Comment", CommentSchima);
export default model;
//새 JS로 작업하고 모듈을 사용하기 때문에 모델을 기본값으로 내보내고 나중에 주석 또는 사용자로 가져 오기 때문에 변수 이름이 동일한 지 여부는 중요하지 않습니다.
