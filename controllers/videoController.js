// golbal routes

import routes from "../routes";
import Video from "../models/Video";
import { compile } from "pug";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] }); //error가 나도 기본 작동을 하게끔 default값 설정
  }
};

export const search = (req, res) => {
  //ECMA -> const searchingBy = req.search.term
  const {
    query: { term: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos }); //seachingBy : searchingBy 와 같은 문법.ES6에서는 자동
};
//video routes

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  //파일이 업로드 되면 url방식으로 해당 파일에 접근한다.왜냐면 multer로 바꿨으니까
  res.redirect(routes.videoDetail(newVideo.id));
}; // To Do : Upload and Save video

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
