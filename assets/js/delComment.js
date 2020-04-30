import axios from "axios";
import "./addComment";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commnetDelBtn = document.getElementsByTagName("button");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = (event) => {
  const span = event.target.parentNode;
  //const spani = span.parentNode;
  const li = span.parentNode;
  commentList.removeChild(li);
  decreaseNumber();
};

export const sendDelComment = async (event) => {
  //const span = event.target.parentNode;
  //const li = span.parentNode;
  const commentId = event.target.id;
  const response = await axios({
    url: `/api/${commentId}/delete/comment`,
    method: "POST",
  });
  if (response.status === 200) {
    delComment(event);
  }
  /*const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delete/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }*/
};
export const handleDelBtn = (event) => {
  sendDelComment(event);
};

const btnAddEvent = () => {
  for (let i = 0; i < commnetDelBtn.length; i++) {
    commnetDelBtn[i].addEventListener("click", sendDelComment);
  }
};

function init() {
  btnAddEvent();
}

if (commentList) {
  init();
}
