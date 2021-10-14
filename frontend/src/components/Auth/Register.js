import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import API from '../../api';

const Register = () => {
    const initialState = { name: '', email: '', password: '', confirmPassword: '' };
    const [formData, setFormData] = useState(initialState);
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/register", formData);
            localStorage.setItem("profile", JSON.stringify(response.data));
            window.location.href = "/";

        } catch (error) {
            console.error(error)
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    return (
        <div className="login-page">
            <form onSubmit={(e) => handleRegister(e)}>
                <h2>Register</h2>
                <input type="text" name="name" placeholder="Enter name" required onChange={handleChange} />
                <input type="email" name="email" required placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" required placeholder="Password" onChange={handleChange} />
                <input type="password" name="confirmPassword" required placeholder="Confirm Password" onChange={handleChange} />
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;