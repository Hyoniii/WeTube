import multer from "multer";
import routes from "./routes";

//multer 는 함수를 집어넣으면 미들웨어가 URL을 반환한다.
const multerVideo = multer({ dest: "uploads/videos/" }); //videos폴더에 업로드 하겠다.는 뜻

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //passport는 유저가 담긴 오브젝트를 줄수있다.
  next();
}; // res.locals은 템플릿 전역변수

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.login);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
