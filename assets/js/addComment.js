import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  console.log(response);
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
