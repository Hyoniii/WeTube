import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import routes from "./routes";
import {
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      //process.env.PRODUCTION
      callbackURL: `https://safe-tundra-06020.herokuapp.com${routes.githubCallback}`,
      //: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      //process.env.PRODUCTION
      callbackURL: `https://safe-tundra-06020.herokuapp.com${routes.kakaoCallback}`,
      //: `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); //passport에게 쿠키에 user.id만 담아서 보내라.
passport.deserializeUser(User.deserializeUser()); //해독해서 넘김
