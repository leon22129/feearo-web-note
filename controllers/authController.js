// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const registerUser = async (req, res) => {
    // Implementation here
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username, password, hashedPassword);

    try {
        const newUser = new User({ username, password: hashedPassword, email });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// Login
const loginUser = async (req, res) => {
    // Implementation here
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ user: user}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { registerUser, loginUser };