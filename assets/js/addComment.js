import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delButton = document.getElementById("jsDelBtn");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteBtn = () => {
  const span = event.target.parentNode;
  const li = span.parentNode;
  commentList.removeChild(li);
  decreaseNumber();
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
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
  if (response.status === 200) {
    addComment(comment);
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
  delButton.addEventListener("click", deleteBtn);
}

if (addCommentForm) {
  init();
}

/*중요한 순서의 흐름
👉🏽addCommentForm이 존재하는 페이지에 들어오면 함수(init) 실행
👉🏽form>input에 입력후 서브밋 되면 밸류가 변수 comment에 저장됨
👉🏽sendComment함수 실행. data:comment 가 videoController로 넘어감
*/
