import mongoose from "mongoose";

const registrationTokenSchema = new mongoose.Schema(
    {
        userId: String,
        registrationToken: String,
    },
    {   
  timestamps: {
    createdAt: "createdAt",
    wrightConcern: {
      w: 1,
      wtimeout: 2000
    }
  }
}
);

registrationTokenSchema.index({"createdAt": 1}, {expireAfterSeconds: 3600});  

export default mongoose.model("RegistrationToken", registrationTokenSchema);