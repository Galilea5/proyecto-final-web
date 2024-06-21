import React, { useState } from 'react';
import './Login.css';  // estilos CSS 
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    localStorage.clear()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({ username, password })
        const response = await getData(SERVER + "Login.php", data)
        if (response.data.success) {
            localStorage.setItem("token", response.data.token)
            navigate("/");
        }
        else
            alert(response.data.error)
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Inicio de Sesión</h2>
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
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <br/>
                <br/>
                <button type="button" className="register-button" onClick={()=> navigate("/signIn")}>Registarse</button>
            </form>
        </div>
    );
};

export default Login;