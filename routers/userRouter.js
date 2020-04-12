// route - /users/  의 구조
import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

//userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile); //위치가 중요. userDetail보다 위에 위채해야 :id가 제대로 인식.
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); //userDetail() in routes.js

export default userRouter;
