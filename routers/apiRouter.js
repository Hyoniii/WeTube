import express from "express";
import routes from "../routes";
import {
  registerView,
  postAddComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView); //DB를 변경할 필요가 없으면 getRequest, DB를 변경해야하는 경우는 post
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.delComment, deleteComment);

export default apiRouter;
