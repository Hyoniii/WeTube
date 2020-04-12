import passport from "passport";
import routes from "../routes";
import User from "../models/User";

//global routes
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
//middleware
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //To Do : Register User
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    //To Do : Log user in
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
}); //local 은 strategy, username과 password로 인증하는. passport.authenticate() tries to log in the user with a strategy.
//postJoin의 User.register(user, password)으로 authenticate

export const githubLogin = passport.authenticate("github");

//첫번빼와 두번쨰 인자를 안쓸거라서 아래처럼 표기.
//githubLoginCallback은 꼭 cb를 실행해야한다.그리고 error와 user유무 알려줘야함
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user); //(error,user) 에러는 null이다.
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
}; //cb는 callback. passport에서 제공하는 함수.passport에게 성공적인 로그인을 알려줌.

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //To Do : Process Log out
  req.logout();
  res.redirect(routes.home);
};
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
  //여기서 유저는 현재 로그인 된 유저
};

//users routes
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = async (req, res) => {
  //여기서 유저는 로그인 유무 상관없는.
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Chang Password" });
