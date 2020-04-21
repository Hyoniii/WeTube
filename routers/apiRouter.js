import express from "express";
import routes from "../routes";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, registerView); //위치가 중요. userDetail보다 위에 위채해야 :id가 제대로 인식.

export default apiRouter;
