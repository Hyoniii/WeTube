import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); //passport에게 쿠키에 user.id만 담아서 보내라.
passport.deserializeUser(User.deserializeUser());
