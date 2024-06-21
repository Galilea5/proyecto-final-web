import React, { useEffect, useState } from 'react';
import './Dashboard.css';  // Estilos CSS 
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';
import AuthProvider from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const ShowTasks = () => {
    const [userState, setUserState] = useState(0);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const navigate = useNavigate();

    const onLogIn = () => setUserState(1);

    const onLogOut = () => {
        console.log("Rechazado");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getTasks = async () => {
        const data = JSON.stringify({ idProyect: localStorage.getItem("idProyect") });
        const response = await getData(SERVER + "getTasks.php", data);
        console.log(response.data.projects);

        // Filtrar las tareas según su estado
        const pending = response.data.projects.filter(task => task.status === 'Pendiente');
        const inProgress = response.data.projects.filter(task => task.status === 'En progreso');
        const completed = response.data.projects.filter(task => task.status === 'Completada');

        setPendingTasks(pending);
        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
    };

    useEffect(() => {
        if (userState === 1) getTasks();
    }, [userState]);

    const handleDeleteTask = async (taskId, status) => {
        // Lógica para eliminar la tarea en el servidor y actualizar el estado local
        if (status === 'Pendiente') {
            setPendingTasks(pendingTasks.filter(task => task.PK_task_id !== taskId));
        } else if (status === 'En progreso') {
            setInProgressTasks(inProgressTasks.filter(task => task.PK_task_id !== taskId));
        } else if (status === 'Completada') {
            setCompletedTasks(completedTasks.filter(task => task.PK_task_id !== taskId));
        }
        const data = JSON.stringify({ task_id: taskId })
        const response = await getData(SERVER + "deleteTask.php", data)
        console.log(response)

    };

    const handleChangeStatus = async (taskId, oldStatus, newStatus) => {
        // Lógica para actualizar el estado de la tarea en el servidor y actualizar el estado local
        let taskToUpdate;

        // Remover tarea de su arreglo original
        console.log(taskId);
        console.log(newStatus);
        console.log(oldStatus);
        if (newStatus === 'En progreso') {
            if (oldStatus === "Pendiente") {
                taskToUpdate = pendingTasks.find(task => task.PK_task_id === taskId);
                console.log(taskToUpdate)
                if (taskToUpdate) {
                    setPendingTasks(pendingTasks.filter(task => task.PK_task_id !== taskId));
                    setInProgressTasks([...inProgressTasks, { ...taskToUpdate, status: newStatus }]);
                }
            } else {
                taskToUpdate = completedTasks.find(task => task.PK_task_id === taskId);
                if (taskToUpdate) {
                    setCompletedTasks(completedTasks.filter(task => task.PK_task_id !== taskId));
                    setPendingTasks([...pendingTasks, { ...taskToUpdate, status: newStatus }]);
                }
            }

        } else if (newStatus === 'Completada') {
            if (oldStatus === "Pendiente") {
                taskToUpdate = pendingTasks.find(task => task.PK_task_id === taskId);
                if (taskToUpdate) {
                    setPendingTasks(pendingTasks.filter(task => task.PK_task_id !== taskId));
                    setInProgressTasks([...inProgressTasks, { ...taskToUpdate, status: newStatus }]);
                }
            } else {
                taskToUpdate = inProgressTasks.find(task => task.PK_task_id === taskId);
                console.log(taskToUpdate)
                if (taskToUpdate) {
                    setInProgressTasks(inProgressTasks.filter(task => task.PK_task_id !== taskId));
                    setCompletedTasks([...completedTasks, { ...taskToUpdate, status: newStatus }]);
                }
            }

        } else if (newStatus === 'Pendiente') {
            if (oldStatus === "En progreso") {
                taskToUpdate = inProgressTasks.find(task => task.PK_task_id === taskId);
                console.log(taskToUpdate)
                if (taskToUpdate) {
                    setInProgressTasks(inProgressTasks.filter(task => task.PK_task_id !== taskId));
                    setCompletedTasks([...completedTasks, { ...taskToUpdate, status: newStatus }]);
                }
            } else {
                taskToUpdate = completedTasks.find(task => task.PK_task_id === taskId);
                if (taskToUpdate) {
                    setCompletedTasks(completedTasks.filter(task => task.PK_task_id !== taskId));
                    setPendingTasks([...pendingTasks, { ...taskToUpdate, status: newStatus }]);
                }
            }

        }

        const data = JSON.stringify({ task_id: taskId, status: newStatus })
        const response = await getData(SERVER + "updateStatus.php", data)
        console.log(response)
    };

    const goToComments = (id) => {
        localStorage.setItem("TaskId", id)
        navigate("/comments")
    }

    const handleCreateTask = () => {
        navigate('/newTask');
    };

    if (userState === 1) {
        return (
            <div className="dashboard-container">
                <h2>Tareas</h2>
                <button className="create-task-button" onClick={handleCreateTask}>Crear Tarea</button>
                <div className="tasks-section">
                    <h3>Pendiente</h3>
                    <div className="tasks-grid">
                        {pendingTasks.map((task) => (
                            <div key={task.PK_task_id} className="task-card">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p><strong>Estado:</strong> {task.status}</p>
                                <p><strong>Prioridad:</strong> {task.priority}</p>
                                <p><strong>Fecha de Creación:</strong> {task.update_at}</p>
                                <button onClick={() => goToComments(task.PK_task_id)} className="task-button">Ver comentarios</button>
                                <button onClick={() => handleDeleteTask(task.PK_task_id, task.status)} className="task-button delete-button">Eliminar</button>
                                <button onClick={() => handleChangeStatus(task.PK_task_id, "Pendiente", 'En progreso')} className="task-button">En Progreso</button>
                                <button onClick={() => handleChangeStatus(task.PK_task_id, "Pendiente", 'Completada')} className="task-2-button">Completada</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tasks-section">
                    <h3>En Progreso</h3>
                    <div className="tasks-grid">
                        {inProgressTasks.map((task) => (
                            <div key={task.PK_task_id} className="task-card">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p><strong>Estado:</strong> {task.status}</p>
                                <p><strong>Prioridad:</strong> {task.priority}</p>
                                <p><strong>Fecha de Creación:</strong> {task.update_at}</p>
                                <button onClick={() => goToComments(task.PK_task_id)} className="task-button">Ver comentarios</button>
                                <button onClick={() => handleDeleteTask(task.PK_task_id, task.status)} className="task-button delete-button">Eliminar</button>
                                <button onClick={() => handleChangeStatus(task.PK_task_id, "En progreso", 'Pendiente')} className="task-button">Pendiente</button>
                                <button onClick={() => handleChangeStatus(task.PK_task_id, "En progreso", 'Completada')} className="task-2-button">Completada</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tasks-section">
                    <h3>Completada</h3>
                    <div className="tasks-grid">
                        {completedTasks.map((task) => (
                            <div key={task.PK_task_id} className="task-card">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p><strong>Estado:</strong> {task.status}</p>
                                <p><strong>Prioridad:</strong> {task.priority}</p>
                                <p><strong>Fecha de Creación:</strong> {task.update_at}</p>
                                <button onClick={() => goToComments(task.PK_task_id)} className="task-button">Ver comentarios</button>

                                <button onClick={() => handleDeleteTask(task.PK_task_id, task.status)} className="task-button delete-button">Eliminar</button>
                                <button onClick={() => handleChangeStatus(task.PK_task_id, "Completada", 'Pendiente')} className="task-button">Pendiente</button>
                                <button onClick={() => handleChangeStatus(task.PK_task_id, "Completada", 'En progreso')} className="task-2-button">En Progreso</button>
                            </div>
                        ))}
                    </div>
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

export default ShowTasks;
