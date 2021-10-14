import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/signin", { email, password });
            localStorage.setItem("profile", JSON.stringify(response.data));
            window.location.href = "/";

        } catch (error) {
            console.error(error)
        }

    }


    return (
        <div className="login-page">
            <form onSubmit={(e) => handleSignIn(e)}>
                <h2>Ulogujte se</h2>
                <input type="email" name="email" required placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" required placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <div className="row">
                    <button type="submit">Ulogujte se</button>
                    <Link to="/register">Registrujte se</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
