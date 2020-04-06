const path = require("path"); // = import path from "path", 모던자바스크립트가 아니라서 import를 인식못함
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV; //package.js랑 동일한 이름. dotenv
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); //path.join joins two paths together.
const OUTPUT_DIR = path.join(__dirname, "static"); //static 폴더로 보내라,path.resolve returns a full path form the root of your computer to the file.

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    //확장자가 scss인 파일찾고 css로 바꾸고 전체 텍스트중에서 css 텍스트 추출. 그 추출된 css를 분리된 파일로 생성.
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/, //scss파일 전부 찾는 정규식.
        use: ExtractCSS.extract(
          //extract text webpack,추출한다. 결국 마지막 css를 추출하게 된다.
          [
            {
              loader: "css-loader", //3번.webpack이 css를 이해하게 된다.
            },
            {
              loader: "postcss-loader", //2번.css를 받아서 얘한테 주어주는 plugin 사용해서 css를 변환.(css호환성)
              options: {
                plugins() {
                  return [autoprefixer({ browsers: "cover 99.5%" })];
                },
              },
            },
            {
              loader: "sass-loader", //실행순서1번.sacc/scss를 받아서 일반 css로 바꿈
            },
          ]
        ),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js", //The name of the input file
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
