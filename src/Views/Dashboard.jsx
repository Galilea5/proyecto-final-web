import React, { useEffect, useState } from 'react';
import './Dashboard.css';  // Estilos CSS 
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';
import AuthProvider from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userState, setUserState] = useState(0);
    const [projectData, setProjectData] = useState([]);
    const navigate = useNavigate();

    const onLogIn = () => setUserState(1);

    const onLogOut = () => {
        console.log("Rechazado")
        localStorage.removeItem("token");
        navigate("/login");
    };


    const getProyect = async () => {
        const data = JSON.stringify({ token: localStorage.getItem("token") })
        const response = await getData(SERVER + "getProyects.php", data)
        console.log(response.data.projects)
        setProjectData(response.data.projects)
    }


    useEffect(() => {
        if (userState === 1) getProyect();
    }, [userState])

    if (userState === 1) {
        // Estado inicial con proyectos

        const goToTasks = (id) => {
            localStorage.setItem("idProyect", id)
            console.log(id)
            navigate("/taskList");
        }

        const handleCreateTask = () => {
            navigate('/newProyect');
        };
        return (
            <div className="dashboard-container">
                <h2>Proyectos</h2>
                <button className="create-task-button" onClick={handleCreateTask}>Crear Proyecto</button>
                <div className="projects-grid">
                    {projectData.map((project) => (
                        <div key={project.PK_project_id} className="project-card" onClick={() => goToTasks(project.PK_project_id)}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            {/* <p><strong>Estado:</strong> {project.status}</p> */}
                            {/* <p><strong>Prioridad:</strong> {project.priority}</p> */}
                            <p><strong>Fecha de Creación:</strong> {project.created_at}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <AuthProvider logIn={onLogIn} logOut={onLogOut}>
            <div>Cargando</div>
        </AuthProvider>
    );
};

export default Dashboard;
