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

export const logout = (req, res) => {
  //To Do : Process Log out
  res.redirect(routes.home);
};

//users routes
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Chang Password" });
