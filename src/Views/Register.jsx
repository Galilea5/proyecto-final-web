import React, { useState } from 'react';
import './Register.css';  // estilos CSS 
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({ email, username, password })
        const response = await getData(SERVER + "CreateUser.php", data)
        if (response.data.success) {
            localStorage.setItem("token", response.data.token)
            navigate("/")
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Registrarse</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Registrarse</button><br/>
                <br/>
                <button type="button" className="login-button" onClick={()=> navigate("/login")}>Iniciar Sesión</button>
        
            </form>
        </div>
    );
};

export default Register;