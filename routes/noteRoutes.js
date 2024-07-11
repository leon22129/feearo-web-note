const express = require('express');
const { createNote, getNotes, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;