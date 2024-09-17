import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import "./Login.scss";
import logo from "./logo.png"; // Ensure logo is correctly imported

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, pwd)
            .then(() => {
                navigate("/Dashboard"); // Redirect on successful login
            })
            .catch(error => {
                setErrorMsg("Login Failed"); // Show error message on failure
            });
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password"); // Navigate to the Forgot Password component
    };

    return (
        <section className="login-section">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="auth">
                <h1>Se connecter</h1>
                <form onSubmit={handleLogin}>
                    {errorMsg && <p>{errorMsg}</p>}
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
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                    />
                    <div className="forgot-password">
                        <button type="button" onClick={handleForgotPassword} className="forgot-password-button">
                            mot de passe oublié?
                        </button>
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </section>
    );
};

export default Login;
