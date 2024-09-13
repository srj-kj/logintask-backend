import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { UserDocument, comparePasswordFunction } from "../@types";
import bcrypt from "bcrypt";


export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userType: { type: String, enum: ['Member', 'Admin',"superAdmin"], default: 'Member', required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

userSchema.pre("save", function save(next) {
  const admin = this;
  try {
    if (!admin.isModified("password")) {
      return next();
    }
    const hash = bcrypt.hashSync(admin.password, 10);
    admin.password = hash;
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.pre("findOneAndUpdate", function findOneAndUpdate(next) {
  try {
    const data: any = this.getUpdate();
    if (data) {
      const password = data.$set.password;
      if (password) {
        this.setOptions({});
        const hash = bcrypt.hashSync(password, 10);
        this.setUpdate({ ...data.$set, password: hash });
      }
    }
    next();
  } catch (err) {
    return next(err as Error);
  }
});

const comparePassword: comparePasswordFunction = async function (
  this: any,
  candidatePassword: string,
  cb: any
) {
  try {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password);

    cb(null, isMatch);
  } catch (err) {
    cb(err, false);
  }
};

userSchema.methods.comparePassword = comparePassword;

// paginate with this plugin
userSchema.plugin(paginate);

// create the paginated model
export const Users = mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>("Users", userSchema, "users");
