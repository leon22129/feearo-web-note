// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
        }
    };
    return (
        // <form onSubmit={handleSubmit}>
        //     Username:<input type="text" name="username" onChange={handleChange} required />
        //     Email:<input type="email" name="email" onChange={handleChange} required />
        //     Password:<input type="password" name="password" onChange={handleChange} required />
        //     <button type="submit">Register</button>
        // </form>

        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
export default Register;