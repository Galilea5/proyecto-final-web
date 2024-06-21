import React, { useState } from 'react';
import './CreateTask.css';  // Puedes agregar estilos CSS aquí
import Header from '../Components/Header';
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../AuthProvider';

const CreateProyect = () => {
    const [userId, setUserId] = useState(localStorage.getItem("token")); // Reemplaza con el ID correcto
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [userState, setUserState] = useState(0);
    const navigate = useNavigate();

    const onLogIn = () => setUserState(1);

    const onLogOut = () => {
        console.log("Rechazado")
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            user_id: userId,
            name,
            description,
        };

        const data = JSON.stringify(newTask)
        const response = await getData(SERVER + "CreateProject.php", data)
        console.log(response)
        if (response.data.success) navigate("/")
    };

    if (userState === 1) {
        return (<>
            {/* <Header /> */}
            <div className="create-task-container">
                <form onSubmit={handleSubmit} className="create-task-form">
                    <h2>Crear Nueva Tarea</h2>
                    <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="create-task-button">Crear Tarea</button>
                    <br/>
                    <br/>
                    <button type="button" className="task-2-button" onClick={() => navigate("/")}>Regresar</button>
                </form>
            </div>
        </>
        );
    }
    return (
        <AuthProvider logIn={onLogIn} logOut={onLogOut}>
            <div>Cargando</div>
        </AuthProvider>
    );
};

export default CreateProyect;