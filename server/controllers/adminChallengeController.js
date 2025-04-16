import ChallengeModel from "../models/Challenge.js";

const createChallenge = async (req, res) => {
  try {
    const newChallenge = new ChallengeModel(req.body);

    const savedChallenge = await newChallenge.save();
    res.status(201).json(savedChallenge);
  } catch (error) {
    res.status(500).json({ message: "Failed to create challenge", error });
  }
};

const updateChallenge = async (req, res) => {
  try {
    const updated = await ChallengeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update challenge", error });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const deleted = await ChallengeModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Challenge not found" });
    }
    res.json({ message: "Challenge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete challenge", error });
  }
};

export { createChallenge, updateChallenge, deleteChallenge };
