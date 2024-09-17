import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService'; // Ensure AuthService handles the forget password logic
import "./Forget.scss"; // Reusing the same CSS for styling
import logo from "../Login/logo.png"; // Ensure logo is correctly imported

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = (e) => {
        e.preventDefault();
        AuthService.resetPassword(username, email) // Ensure you implement this method in AuthService
            .then(response => {
                setMessage("If the username and email match, a new password will be sent to your email.");
                setTimeout(() => navigate('/login'), 5000); // Redirect back to login after 5 seconds
            })
            .catch(error => {
                setMessage("Failed to reset password. Please try again.");
            });
    };

    return (
        <section className="login-section">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="auth">
                <h1>Réinitialiser le mot de passe</h1>
                <form onSubmit={handleReset}>
                    {message && <p>{message}</p>}
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="off"
                        placeholder="Nom d'utilisateur"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Envoyer mail de réinitialisation</button>
                </form>
            </div>
        </section>
    );
};

export default ForgetPassword;
