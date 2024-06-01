import './taskPage.css'

import {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from '../spinner/Spinner';

import useUserService from "../../services/UserService";
import {useParams} from "react-router-dom";
import AuthService from "../../services/AuthService";
const TaskPage = () => {

    const {taskId} = useParams();
    const [teacher, setTeacher] = useState(false)

    const [task, setTask] = useState({});
    const [answers, setAnswers] = useState([]);
    const [file, setFile] = useState(null);
    const [ball, setBall] = useState(null);
    const [message, setMessage] = useState()
    const [ballMessage, setBallMessage] = useState()

    const {getTask, refreshToken, error, loading, clearError, addAnswer, getAnswersTeacher, addBallTeacher, download} = useUserService();

    useEffect(() => {
        const user = localStorage.getItem("username");

        if (user) {
            const roles = localStorage.getItem("roles")
            setTeacher(roles.includes("ROLE_TEACHER"))
        }
        console.log(teacher)
        clearError();
        updateTask()
    }, [])

    useEffect(() => {
        clearError();
        updateTask()
    }, [teacher])

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                    updateTask();
                }
            );
        }
    },[error])

    const updateTask = () => {
        clearError();
        getTask(taskId)
            .then(onTaskLoaded)
        if (teacher === true) {
            getAnswersTeacher(taskId)
                .then(onAnswersLoaded)
        }
    }

    const onTaskLoaded = (task) => {
        setTask(task);
    }

    const onAnswersLoaded = (answers) => {
        setAnswers(answers);
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const sendFile = () => {
        clearError();
        if (file !== null) {
            console.log(file)
            addAnswer(taskId, file)
                .then((message) => {
                    setMessage(message)
                    updateTask()
                })
        } else {
            setMessage("Выберите файл")
        }
    }

    const handleBallChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        if (e.target.value) {
            setBall(e.target.value);
        }
    };

    const sendBall = (id) => {
        clearError();
        if (ball !== null) {
            setBallMessage()
            addBallTeacher(id, ball)
                .then((message) => {
                    updateTask()
                    setBall(null)
                })
        } else {
            setBallMessage("Введите оценку")
        }
    }

    function downloadFile(filePath) {
        clearError();
        console.log(filePath)
        download(filePath)
    }
    const answersList = (answers) => {
        if (teacher) {
            if (answers.length !== 0) {
                const list = answers.map(answer => {
                    return <tr>
                        <td style={{borderLeft: 0}}>{answer.user.last_name + ' ' + answer.user.first_name}</td>
                        <td><a href={`http://localhost:8083/api/download/${answer.answer}`}>{answer.answer}</a></td>
                        <td>{answer.ball ? answer.ball : 'Нет оценки'}</td>
                        <td>
                                <input
                                    className={
                                        (ballMessage
                                            ? ' admin-page-input-invalid' : 'admin-page-input')}
                                    placeholder="Балл"
                                    type="text"
                                    id="ball"
                                    onChange={handleBallChange}
                                />
                                {ballMessage ? <p className="admin-page-invalid-message">{ballMessage}</p>
                                    : null}
                        </td>
                        <td style={{borderRight: 0}}>
                            <div style={{display: "flex", justifyContent: 'center', width: "100%"}}>
                                <button onClick={() => sendBall(answer.id)}
                                        className="container-task-page-answer-button"
                                        style={{textAlign: 'center'}}>
                                    Оценить
                                </button>
                            </div>
                        </td>
                    </tr>
                })
                return list
            } else {
                return <></>
            }
        } else {
            return <h1></h1>
        }
    }
    const list = answersList(answers)
    const buttons = task.ball === 'Не отправлено' && !(loading || error || !task) ? <>
        <div className="file-input">
            <input className='file' id='file' type="file" onChange={handleFileChange}/>
            <label htmlFor="file">Выбрать файл</label>
        </div>
        {file ?
            <div style={{display: "flex", width: "100%", justifyContent: "center", paddingTop: "5%", paddingBottom: "15%"}}>{file.name}</div> : null}
        <button onClick={() => sendFile()} className='container-task-page-about-task-button'>Загрузить файл</button>
        <div style={{display: "flex", width: "100%", justifyContent: "center", paddingTop: "15%"}}>{message}</div>
    </> : null;

    const buyCourse = error === 'Необходимо купить курс!' ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><h1 style={{marginTop: "15vh"}}>Необходимо купить курс</h1></div> : null;
    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!'?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;
    const content = !(loading || error || !task) ? <div className='container-task-page'>
        <div className='container-task-page-title'>
            <h1>{task.name}</h1>
        </div>
        <div className='container-task-page-about-task'>
            <div className='container-task-page-about-task-text'>
                <h1>Что надо делать</h1>
                <p>{task.description}</p>
            </div>
            <div className='container-task-page-about-task-information-card'>
                <h4>Минимальный балл</h4>
                <h2>{task.min_ball}</h2>
                {teacher === false? <><h4>Ваша оценка</h4>
                <h2>{task.ball}</h2>
                {buttons}</> : null}
            </div>
        </div>
        {teacher ? <>
            <div className='container-task-page-table'>
                <h1>Ответы на задания</h1>
                <table className="task-page-table">
                    <tr>
                        <td style={{borderLeft: 0, fontWeight: 600}}><p>Студент</p></td>
                        <td style={{fontWeight: 600}}>Ответ</td>
                        <td style={{fontWeight: 600}}>Оценка</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {list}
                </table>
            </div>
        </> : null}
    </div>
: null;

return (
    <>
        {unauthorized}
        {errorMessage}
        {spinner}
        {content}
    </>
)
};

export default TaskPage;