const jwt = require('jsonwebtoken');
const User = require('../modals/user');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, error: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, "Its_My_Secret_Key");
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

module.exports = auth;
