import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteApp = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (token) {
            axios.get('/api/notes', { headers: { Authorization: token } })
                .then(response => setNotes(response.data))
                .catch(error => console.error(error));
        }
    }, [token]);

    const register = () => {
        axios.post('/api/register', { username, password })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const login = () => {
        axios.post('/api/login', { username, password })
            .then(response => {
                setToken(response.data.token);
                setIsLoggedIn(true);
            })
            .catch(error => console.error(error));
    };

    const addNote = () => {
        axios.post('/api/notes', { content }, { headers: { Authorization: token } })
            .then(response => setNotes([...notes, response.data]))
            .catch(error => console.error(error));
        setContent('');
    };

    const deleteNote = (id) => {
        axios.delete(`/api/notes/${id}`, { headers: { Authorization: token } })
            .then(() => setNotes(notes.filter(note => note._id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <div>
    
                <div>
                    <h1>Note App</h1>
                    <input 
                        type="text" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Write a note..."
                    />
                    <button onClick={addNote}>Save Note</button>
                    <ul>
                        {notes.map(note => (
                            <li key={note._id}>
                                {note.content}
                                <button onClick={() => deleteNote(note._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
};

export default Note;