import mongoose from "mongoose";

const registrationTokenSchema = new mongoose.Schema(
    {
      userId: String,
      registrationToken: String,
    },
    {   
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        wrightConcern: {
          w: 1,
          wtimeout: 2000
    }
  }
}
);

registrationTokenSchema.index({updated_at: 1}, {expireAfterSeconds: 3600});  

export default mongoose.model("RegistrationToken", registrationTokenSchema);