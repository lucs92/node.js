import mongoose from "mongoose";
import { userStatus } from "../const/constant.js";

const userSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: String,
    salt: String,
    status: {
      type: String,
      default: userStatus.PENDING,
  },
},
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      wrightConcern: {
        w: 1,
        wtimeout: 2000,
      },
    },
  }
);

userSchema.index({name: 1 });

const user = mongoose.model("User", userSchema);

export default user;