import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commnetDelBtn = document.getElementById("jsDelBtn");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = (event) => {
  const span = event.target.parentNode;
  const li = span.parentNode;
  commentList.removeChild(li);
  decreaseNumber();
};

const sendDelComment = async (event) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delete/comment`,
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

function init() {
  commnetDelBtn.addEventListener("click", sendDelComment);
}

if (commentList) {
  init();
}
