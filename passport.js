import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import routes from "./routes";
import { githubLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); //passport에게 쿠키에 user.id만 담아서 보내라.
passport.deserializeUser(User.deserializeUser());
