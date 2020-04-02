//MongDB에게 내 video들의 형태를 정의해서 알려주는 파일.
//model(document name)과 schema(형태) 정의
//video를 database에 넣지않는다. bytes가 아닌 link를 넣어준다.

import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "File URL is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now //mongoose가 자동으로 () 실행
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }
});

const model = mongoose.model("Video", VideoSchema);
export default model;
