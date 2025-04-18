import mongoose, { Schema } from "mongoose";

const challengeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 10,
    },
    isDaily: {
      type: Boolean,
      default: true,
    },
    category: {
      enum: ["Water", "Waste", "Energy", "Nature", "Awareness", "Other"],
    },
  },
  {
    timestamps: true,
  }
);

const ChallengeModel = mongoose.model("Challenge", challengeSchema);

export default ChallengeModel;
