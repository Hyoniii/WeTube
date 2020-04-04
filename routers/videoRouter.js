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
  getUpload
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
//Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload); //첫번째 함수로 넘어가면 multer로 file url반환 후 그 값으로 두번째 함수 접근
//Detail
videoRouter.get(routes.videoDetail(), videoDetail);
//Edit
videoRouter.get(routes.editVideo(), getEditVideo); //함수 작동.() 아주 중요
videoRouter.post(routes.editVideo(), postEditVideo); //함수 작동.() 아주 중요
//Delete
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
