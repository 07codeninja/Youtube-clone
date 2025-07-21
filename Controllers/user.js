const User = require('../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
  httpOnly: true,
  secure: false, // Change to true in production
  sameSite: 'Lax'
};

exports.signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;

    const isExist = await User.findOne({ userName });
    if (isExist) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      channelName,
      userName,
      about,
      profilePic,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, cookieOptions).status(201).json({
      message: 'User created successfully',
      token,
      user
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, cookieOptions).status(200).json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
};
