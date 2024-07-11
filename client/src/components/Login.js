// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../style.css';


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
   const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        navigate('/register');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            login();
            navigate('/notes');
            console.log("navigate -- "  + res.data.token);
        } catch (err) {
            console.log(err.response.data)
            alert(err.response.data.error);
        }
    };
    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <button onClick={handleRegister}>Create Account</button>
            </form>
        </div>
    );
};
export default Login;