// golbal routes

import routes from "../routes";
import Video from "../models/Video";
import { compile } from "pug";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //-1은 위아래 정렬을 바꿔준다는 약속
    res.render("home", { pageTitle: "Home", videos });
  } catch {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] }); //error가 나도 기본 작동을 하게끔 default값 설정
  }
};

export const search = async (req, res) => {
  //ECMA -> const searchingBy = req.search.term
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos }); //seachingBy : searchingBy 와 같은 문법.ES6에서는 자동
};
//video routes

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  //파일이 업로드 되면 url방식으로 해당 파일에 접근한다.왜냐면 multer로 바꿨으니까
  res.redirect(routes.videoDetail(newVideo.id));
}; // To Do : Upload and Save video

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video }); //여기서 정해진 data(ex.video)를 template(editVideo.pug)으로 전달.
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
