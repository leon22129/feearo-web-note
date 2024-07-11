// src/components/Notes.js
import React, { useContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
const Notes = () => {
    const { logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await axios.get('http://localhost:5000/api/notes', {
                headers: { 'x-auth-token': token },
            });
            setNotes(res.data);
        };
        fetchNotes();
    }, [token]);
    const handleAddNote = async (e) => {
        e.preventDefault();
        const newNote = { title, content };
        const res = await axios.post('http://localhost:5000/api/notes/create', newNote, {
            headers: { 'x-auth-token': token },
        });
        setNotes([...notes, res.data]);
    };
    const handleDeleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/api/notes/${id}`, {
            headers: { 'x-auth-token': token },
        });
        setNotes(notes.filter((note) => note._id !== id));
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <div className="note-group">
            <button style={{float: 'right'}} onClick={handleLogout}>Logout</button>
            <form onSubmit={handleAddNote}>
            
                <div className="note-form">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                </div>

                <div className="note-form">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        required
                    />
                </div>
                
                <button type="submit">Add Note</button>
            </form>

            <h2>User's Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Notes;