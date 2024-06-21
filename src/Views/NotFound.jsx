import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/'); // Cambia '/dashboard' a la ruta que prefieras
    };

    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <button onClick={goHome} className="notfound-button">Ir al Dashboard</button>
        </div>
    );
};

export default NotFound;
