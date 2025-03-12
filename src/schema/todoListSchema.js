import mongoose from "mongoose";
import { status } from "../const/constant.js";

const activitySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    dueDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: status.OPEN,
  },
  userId: {
    type: String,
    required: true,
  }
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

activitySchema.index({name: 1 });

const activity = mongoose.model("Activity", activitySchema);

export default activity;