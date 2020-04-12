import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

//User model은 field를 가지게 된다. 아래 생성.
//passport-local-mongoose create a password field automatically. On the next update of this course we are gonna do this manually.
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

//Model<T extends mongoose.Document, QueryHelpers = {}>
//model<mongoose.Document>(name: string, schema?: mongoose.Schema<any>, collection?: string, skipInit?: boolean): mongoose.Model<mongoose.Document, {}> (+3 overloads)
const model = mongoose.model("User", UserSchema);

export default model;
