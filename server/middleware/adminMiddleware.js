const adminMiddleware = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied . Admins only.",
    });
  }
};

export default adminMiddleware;
