import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';  // Archivo de estilos CSS

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <nav className="navigation">
        <button onClick={() => navigate('/')}>Inicio</button>
        <button onClick={() => navigate('/projects')}>Proyectos</button>
        <button onClick={() => navigate('/about')}>Acerca de</button>
        <button onClick={() => navigate('/contact')}>Contacto</button>
      </nav>
    </div>
  );
};

export default Header;
