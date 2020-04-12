// route - /videos/ 의 구조
import express from "express";
import routes from "../routes";
import {
  videos,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  postUpload,
  getUpload,
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
//Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload); //첫번째 함수로 넘어가면 multer로 file url반환 후 그 값으로 두번째 함수 접근
//Detail
videoRouter.get(routes.videoDetail(), videoDetail);
//Edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo); //함수 작동.() 아주 중요
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo); //함수 작동.() 아주 중요
//Delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
