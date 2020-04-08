import multer from "multer";
import routes from "./routes";

//multer 는 함수를 집어넣으면 미들웨어가 URL을 반환한다.
const multerVideo = multer({ dest: "uploads/videos/" }); //videos폴더에 업로드 하겠다.는 뜻

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
