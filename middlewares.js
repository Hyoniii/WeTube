import multer from "multer";
import routes from "./routes";

//multer 는 함수를 집어넣으면 미들웨어가 URL을 반환한다.
const multerVideo = multer({ dest: "uploads/videos/" }); //videos폴더에 업로드 하겠다.는 뜻
const multerAvatar = multer({ dest: "uploads/avatars/" });

//app.locals will be accessible to the application, and res.locals will go directly to the template.

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes; //js파일간이 아닌, 뷰엔진에 routes를 쓸 수 있게 해준다.
  res.locals.loggedUser = req.user || null; //passport는 유저가 담긴 오브젝트를 줄수있다.
  next(); //app.js에서 미들웨어가 커넥션과 라우트들 사이에 있어서
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
export const uploadAvatar = multerAvatar.single("avatar");
