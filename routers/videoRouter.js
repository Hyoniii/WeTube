// route - /videos/ 의 구조
import express from "express";
import routes from "../routes";
import {
  videos,
  videoDetail,
  editVideo,
  deleteVideo,
  postUpload,
  getUpload
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload); //첫번째 함수로 넘어가면 multer로 file url반환 후 그 값으로 두번째 함수 접근

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
