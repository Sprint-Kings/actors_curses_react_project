import './taskPage.css'

import {useEffect, useState} from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from '../spinner/Spinner';

import useUserService from "../../services/UserService";
import {useParams} from "react-router-dom";
const TaskPage = () => {

    const {taskId} = useParams();

    const [task, setTask] = useState({});
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState()

    const {getTask, refreshToken, error, loading, clearError, addAnswer} = useUserService();

    useEffect(() => {
        updateTask()
    }, [])

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
    }

    const onTaskLoaded = (task) => {
        setTask(task);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const submit = () => {
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

    const buttons = task.ball === 'Не отправлено' && !(loading || error || !task) ? <>
        <div className="file-input">
            <input className='file' id='file' type="file" onChange={handleFileChange}/>
            <label htmlFor="file">Выбрать файл</label>
        </div>
        {file ?
            <div style={{display: "flex", width: "100%", justifyContent: "center", paddingTop: "5%", paddingBottom: "15%"}}>{file.name}</div> : null}
        <button onClick={() => submit()} className='container-task-page-about-task-button'>Загрузить файл</button>
        <div style={{display: "flex", width: "100%", justifyContent: "center", paddingTop: "15%"}}>{message}</div>
    </> : null;

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
                <h4>Ваша оценка</h4>
                <h2>{task.ball}</h2>
                {buttons}
            </div>
        </div>
    </div> : null;

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