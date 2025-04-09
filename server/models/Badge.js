import mongoose, { Schema } from "mongoose";

const badgeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    criteria: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BadgeModel = mongoose.model("Badge", badgeSchema);

export default BadgeModel;
