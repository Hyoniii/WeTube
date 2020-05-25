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
      user.githubId = id; //내 경우에는 로컬이메일과 깃허브이메일이 동일해서 몽고디비 user정보에서 로컬정보에 깃허브 아이디가 추가.저장된다. 그런 의미의 코드.
      user.avatarUrl = avatar_url;
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

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, properties, kakao_account },
  } = profile;
  try {
    const user = await User.findOne({ email: kakao_account.email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email: kakao_account.email,
      name: properties.nickname,
      kakaoId: id,
      avatarUrl: properties.profile_image,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

// 사용자의 정보는 profile에 들어있다.
//User.findOrCreate(..., function(err, user) { if (err) { return done(err); }done(null, user);});

export const postKakaoLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //To Do : Process Log out
  req.logout();
  res.redirect(routes.home);
};
export const getMe = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(req.user.id).populate("videos"); //user에 id.videos의 세부(모든)정보를 보이게 넣겠다.
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
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
    //여기서의 유저는 유저디테일퍼그의 유저
    const user = await User.findById(id).populate("videos"); //user에 id.videos의 세부(모든)정보를 보이게 넣겠다.
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req; //바뀐 내용.
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl, //file이 있으면  file.path 없으면 ,후에 multer.S3로 인해 location으로 변경
    }); //바뀐걸로 업로드
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Chang Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
