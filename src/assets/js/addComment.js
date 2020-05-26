import axios from "axios";
import { sendDelComment } from "./delComment";

const commentNumber = document.getElementById("jsCommentNumber");
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
//const commentText =
//const commnetDelBtn = document.getElementsByClassName("commentDelBtn");
//for (let i = 0; i < commnetDelBtn.length; i++) {
// commnetDelBtn[i].innerHTML = "✖️";}

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  li.className = "video__comments";
  const span = document.createElement("span");
  span.className = "video__comments-text";
  const btn = document.createElement("button");
  btn.className = "video__commentDelBtn";
  btn.innerHTML = "✖️";
  btn.setAttribute("value", commentId);
  span.innerHTML = comment;
  span.appendChild(btn);
  li.appendChild(span);
  commentList.prepend(li);
  btn.addEventListener("click", sendDelComment);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  console.log(response.data._id);
  const commentId = response.data._id;
  if (response.status === 200) {
    addComment(comment, commentId);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}

/*중요한 순서의 흐름
👉🏽addCommentForm이 존재하는 페이지에 들어오면 함수(init) 실행
👉🏽form>input에 입력후 서브밋 되면 밸류가 변수 comment에 저장됨
👉🏽sendComment함수 실행. data:comment 가 videoController로 넘어감
*/
