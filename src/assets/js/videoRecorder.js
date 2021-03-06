const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  const { data: videoFile } = event; //event의 data는 blob을 말한다.
  const link = document.createElement("a"); //다운로드는 기본적으로 링크이기 때문에
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click(); //facking click
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.innerText = "Start Recording";
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getRecording);
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData); //stop이 일어나고 나서 실행
  recordBtn.addEventListener("click", stopRecording);
};

/* A video src is just a video file, but because we are getting a stream from the camera, that is not a file because is being given to us in Real Time by the Media Recorder. */
//이건 비디오를 HTML에 보여주는(보내주는) 기능일뿐 실제 녹화는 아니다.
const getRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 300, height: 150 },
      audio: true,
    });
    videoPreview.srcObject = stream; //파일이 아닌 오브젝트라는걸 꼭 기억하기 <https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject#Syntax>
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "☹️ Can Not Recording";
  } finally {
    recordBtn.removeEventListener("click", getRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", getRecording);
}

if (recorderContainer) {
  init();
}
