import React, { useState } from 'react';
import './CreateTask.css';  // Puedes agregar estilos CSS aquí
import Header from '../Components/Header';
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../AuthProvider';

const CreateTask = () => {
    const [projectId, setProjectId] = useState(localStorage.getItem("idProyect")); // Reemplaza con el ID correcto
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pendiente');
    const [priority, setPriority] = useState('Alta');
    const [dueDate, setDueDate] = useState('2024-06-30');
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
            project_id: projectId,
            title,
            description,
            status,
            priority,
            due_date: dueDate,
        };

        const data = JSON.stringify(newTask)
        const response = await getData(SERVER + "CreateTask.php", data)
        console.log(response)
        if (response.data.success) navigate("/taskList")
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
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                    <div className="form-group">
                        <label htmlFor="status">Estado:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Completada">Completada</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Prioridad:</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_date">Fecha de Vencimiento:</label>
                        <input
                            type="date"
                            id="due_date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="create-task-button">Crear Tarea</button>
                    <br/>
                    <button type="button" className="create-task-button" onClick={() => navigate("/taskList")}>Regresar</button>
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

export default CreateTask;