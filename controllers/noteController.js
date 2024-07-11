// controllers/noteController.js
const Note = require('../models/Note');

// Create Note
const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({
            title,
            content,
            user: req.user._id,
        });
        console.log(req.user._id)
        console.log(newNote);
        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.user.toString() !== req.user._id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Note.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Note removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createNote, getNotes, deleteNote };