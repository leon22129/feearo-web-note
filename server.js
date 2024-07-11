const express = require('express');
const connectDB = require('./config');

// const { registerUser, loginUser } = require('./controllers/authController');
const authController = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const cors = require('cors');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
const router = express.Router();
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));