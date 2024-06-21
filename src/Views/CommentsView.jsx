import React, { useState, useEffect } from 'react';
import './CommentsView.css';  // Estilos CSS
import AuthProvider from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import getData from '../Helper/Fetch';
import { SERVER } from '../Helper/Strings';

const CommentsView = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userState, setUserState] = useState(0);
    const navigate = useNavigate();

    const onLogIn = () => setUserState(1);

    const onLogOut = () => {
        console.log("Rechazado");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            const newCommentObject = {
                PK_comment_id: comments.length + 1,
                content: newComment,
                created_at: new Date().toISOString(),
            };
            setComments([...comments, newCommentObject]);
            setNewComment('');
            const data = JSON.stringify({ task_id: localStorage.getItem("TaskId"), content: newComment })
            console.log(data)
            const response = await getData(SERVER + "CreateComment.php", data)
            console.log(response);
        }
    };

    const getComments = async () => {
        const data = JSON.stringify({ idTask: localStorage.getItem("TaskId")})
        const response = await getData(SERVER + "getComments.php",data)
        setComments(response.data.comments)
    }

    useEffect(() => {
        if (userState === 1) getComments();
    }, [userState]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (userState === 1) {
        return (
            <div className="comments-container">
                <h2>Comentarios</h2>
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div key={comment.PK_comment_id} className="comment-card">
                            <p>{comment.content}</p>
                            <span className="comment-date">{formatDate(comment.created_at)}</span>
                        </div>
                    ))}
                </div>
                <div className="add-comment-container">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe tu comentario..."
                        className="comment-input"
                    />
                    <button onClick={handleAddComment} className="add-comment-button">
                        Comentar
                    </button>
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

export default CommentsView;
