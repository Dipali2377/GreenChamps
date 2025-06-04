import UserModel from "../models/User.js";

const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
      .populate("completedChallenges", "title description")
      .populate("badges", "name icon criteria ");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      completedChallenges: user.completedChallenges,
      badges: user.badges,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDashboard = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
      .populate("completedChallenges", "title description")
      .populate("badges", "name icon criteria");

    res.status(200).json({
      name: user.name,
      email: user.email,
      completedChallenges: user.completedChallenges,
      badges: user.badges,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Route: GET /api/users/badges
const getUserBadges = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("badges");
    res.status(200).json(user.badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUserProfile, getDashboard, getUserBadges };
