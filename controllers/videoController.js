// golbal routes
import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //-1은 위아래 정렬을 바꿔준다는 약속
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  } //error가 나도 기본 작동을 하게끔 default값 설정
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

export const getUpload = (_req, res) =>
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
    creator: req.user.id,
  });
  //주의 할 것!! 유저의 id와 video의 id는 다르다.
  req.user.videos.push(newVideo.id);
  req.user.save();
  //파일이 업로드 되면 url방식으로 해당 파일에 접근한다.왜냐면 multer로 바꿨으니까
  res.redirect(routes.videoDetail(newVideo.id));
}; // To Do : Upload and Save video

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    //console.log(video.creator.id);

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

    if (video.creator == req.user.id) {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } else {
      throw Error();
    }
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
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video.creator);
    console.log(user.id);
    if (video.creator !== user.id) {
      throw Error();
    } else {
      await Video.findByIdAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

//Register Video View
//서버만 소통. 그래서 연결된 템플릿 X
export const registerView = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save(); //ideo.save() updates the video on the database.
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end(); //res.end() finishes the connection with the client.
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    const commentId = await Comment.findById(newComment.id);
    console.log(commentId._id);
    res.send(JSON.stringify(commentId));
    //res.render("videoDetail", { "comment.id": commentId });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
//유저 안에 있ㄴㄴ 배열에서 지우기
//비디오 안에 있는 배열에서 지우기
//프론트에서 지우기
export const deleteComment = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const delComment = await Comment.findById(id);
    const delCommentId = require("mongoose").Types.ObjectId(delComment._id);
    console.log(delCommentId);
    if (delComment.creator != req.user.id) {
      throw Error();
    } else {
      await Comment.findByIdAndRemove(delCommentId);
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
/*const {
    params,
    //body: { comment },
    user,
  } = req;
  try {
    console.log(params);
    /*const com = await Comment.find(comment);
    if (user.id !== com.creator) {
      throw Error();
    } else [
      await video.findOneAndRemove({_id:id})
    ]
    }
      
    }
    //const commentList = await video.comments; //comment.id
    //const commentUser = await user;
    //const commentId = await Comment.findById(id);
    console.log(comment);
    //console.log(commentUser.comments);
    //const delComment = await video.comments.findOneAndRemove();
    //console.log(delComment);
    // await Comment.findByIdAndRemove(delComment.id);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};   */
