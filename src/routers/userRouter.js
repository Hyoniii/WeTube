// route - /users/  의 구조
import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  getChangePassword,
  postChangePassword,
  getEditProfile,
  postEditProfile,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile); //위치가 중요. userDetail보다 위에 위채해야 :id가 제대로 인식.
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail); //userDetail() in routes.js

export default userRouter;
