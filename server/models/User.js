import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    completedChallenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],

    badges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
