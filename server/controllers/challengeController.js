import BadgeModel from "../models/Badge.js";
import ChallengeModel from "../models/Challenge.js";
import UserModel from "../models/User.js";

// create challenge
const createChallenge = async (req, res) => {
  try {
    const { title, description, points, isDaily } = req.body;

    const challenge = new ChallengeModel({
      title,
      description,
      points,
      isDaily,
    });

    await challenge.save();
    res.status(201).json({
      message: "Challenge created",
      challenge,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all challenge

const getChallenges = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const challenges = await ChallengeModel.find(filter);
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// complete a challenge

const completeChallenge = async (req, res) => {
  try {
    const userId = req.user._id;

    const { challengeId } = req.params;

    const user = await UserModel.findById(userId);

    if (user.completedChallenges.includes(challengeId)) {
      return res.status(400).json({
        message: "Challenge already completed",
      });
    }

    user.completedChallenges.push(challengeId);

    // check for badge eligiblility

    const completedCount = user.completedChallenges.length;

    const badges = await BadgeModel.find();

    badges.forEach((badge) => {
      if (
        completedCount >= badge.requiredChallenges &&
        !user.badges.includes(badge._id)
      ) {
        user.badges.push(badge._id);
      }
    });

    await user.save();

    res.status(200).json({ message: "Challenge completed & badge updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createChallenge, getChallenges, completeChallenge };
