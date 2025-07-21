const jwt = require('jsonwebtoken');
const User = require('../Modals/user');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, error: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🔥 Fix here
    req.user = await User.findById(decoded._id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

module.exports = auth;
