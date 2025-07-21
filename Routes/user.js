const express = require('express');
const router = express.Router();
const { signUp, signIn, logout } = require('../Controllers/user');
const User = require('../Modals/user'); // ← make sure this path is correct

// POST /api/signup
router.post('/signup', signUp);

// POST /api/signin
router.post('/signin', signIn);

// GET /api/logout
router.get('/logout', logout);

// ✅ NEW: GET /api/users/find/:id
router.get('/users/find/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error finding user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
