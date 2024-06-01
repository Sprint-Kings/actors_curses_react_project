import './mainCoursePage.css'

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from '../spinner/Spinner';

import useUserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

const MainCoursePage = () => {

    const [taskAndLektionsList, setTaskAndLektionsList] = useState([]);
    const [teacher, setTeacher] = useState(false)

    const {changeStatusLektionTeacher, changeStatusTaskTeacher, getAllTaskAndLektion, getAllTaskAndLektionForTeacher, refreshToken, error, loading, clearError, deleteTaskTeacher, deleteLektionTeacher} = useUserService();



    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            const roles = localStorage.getItem("roles")
            setTeacher(roles.includes("ROLE_TEACHER"))
        }
        clearError();
        updateTaskAndLektionsList()
    }, [])


    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                    updateTaskAndLektionsList();
                }
            );
        }
        if (error === 'Курс не найден') {
            clearError();
            updateTaskAndLektionsList();
        }
    },[error])

    const updateTaskAndLektionsList = () => {
        clearError();
        if (teacher === true) {
            getAllTaskAndLektionForTeacher()
                .then(onTaskAndLektionsLoaded)
        } else {
            getAllTaskAndLektion()
                .then(onTaskAndLektionsLoaded)
        }
    }

    const onTaskAndLektionsLoaded = (taskAndLektions) => {
        setTaskAndLektionsList(taskAndLektions);
    }

    const removeTask = (taskId) => {
        clearError();
        deleteTaskTeacher(taskId).then(
            () => {
                updateTaskAndLektionsList();
            })
    }

    const removeLektion = (lektionId) => {
        clearError();
        deleteLektionTeacher(lektionId).then(
            () => {
                updateTaskAndLektionsList();
            })
    }

    const changeLektion = (lektionId) => {
        clearError();
        changeStatusLektionTeacher(lektionId).then(
            () => {
                updateTaskAndLektionsList();
            })
    }

    const changeTask = (taskId) => {
        clearError();
        changeStatusTaskTeacher(taskId).then(
            () => {
                updateTaskAndLektionsList();
            })
    }

    const teacher_buttons = teacher ? <div className='container-main-course-page-teacher-button-container'>
        <Link to={'/task/create'}><button className='container-main-course-page-teacher-button'>Добавить задание или лекцию</button></Link>
    </div>: null;

    function createList(taskAndLektionsList) {
        if (teacher) {
            const opened = taskAndLektionsList.length !== 0 ? taskAndLektionsList.map((item, i) => {
                if (item.opened === true) {
                    return (
                        <div key={item.description} className='container-main-course-page-cart'>
                            <div style={{display: 'flex', width: "10%", justifyContent: "space-between"}}>
                                <div className='container-main-course-page-cart-date'>
                                    <h4>Начало</h4>
                                    <h1>{item.date_start.split(' ')[0]}</h1>
                                    <h4>{item.date_start.split(' ')[1]}</h4>
                                </div>
                            </div>
                            <h3 style={{textAlign: "left", width: "40%"}}>{item.name}</h3>
                            <button
                                onClick={item.hasOwnProperty('min_ball') ? () => changeTask(item.id) : () => changeLektion(item.id)}
                                className='container-main-course-page-status-button'>{item.opened ? "Закрыть" : "Открыть"}
                            </button>
                            <button
                                onClick={item.hasOwnProperty('min_ball') ? () => removeTask(item.id) : () => removeLektion(item.id)}
                                className='container-main-course-page-delete-button'>Удалить
                            </button>
                            <Link to={item.hasOwnProperty('min_ball') ? `/task/${item.id}` : `/lektion/${item.id}`}
                                  style={{width: "20%"}}>
                                <button className='container-main-course-page-button'>Подробнее</button>
                            </Link>
                        </div>)
                }
            }) : <h1>Заданий пока нет</h1>;

            const closed = taskAndLektionsList.length !== 0 ? taskAndLektionsList.map((item, i) => {
                if (item.opened === false) {
                    return (
                        <div key={item.description} className='container-main-course-page-cart'>
                            <div style={{display: 'flex', width: "10%", justifyContent: "space-between"}}>
                                <div className='container-main-course-page-cart-date'>
                                    <h4>Начало</h4>
                                    <h1>{item.date_start.split(' ')[0]}</h1>
                                    <h4>{item.date_start.split(' ')[1]}</h4>
                                </div>
                            </div>
                            <h3 style={{textAlign: "left", width: "40%"}}>{item.name}</h3>
                            <button
                                onClick={item.hasOwnProperty('min_ball') ? () => changeTask(item.id) : () => changeLektion(item.id)}
                                className='container-main-course-page-status-button'>{item.opened ? "Закрыть" : "Открыть"}
                            </button>
                            <button
                                onClick={item.hasOwnProperty('min_ball') ? () => removeTask(item.id) : () => removeLektion(item.id)}
                                className='container-main-course-page-delete-button'>Удалить
                            </button>
                            <Link to={item.hasOwnProperty('min_ball') ? `/task/${item.id}` : `/lektion/${item.id}`}
                                  style={{width: "20%"}}>
                                <button className='container-main-course-page-button'>Подробнее</button>
                            </Link>
                        </div>)
                }
            }) : <h1>Заданий пока нет</h1>;

            return taskAndLektionsList.length !== 0 ? <><h1>Открытые</h1>{opened}<h1>Закрытые</h1>{closed}</> :
                <h1>Заданий пока нет</h1>;

        } else {
            return taskAndLektionsList.length !== 0 ? taskAndLektionsList.map((item, i) => {
                return (
                    <div key={item.description} className='container-main-course-page-cart'>
                        <div style={{display: 'flex', width: "15%", justifyContent: "space-between"}}>
                            <div className='container-main-course-page-cart-date'>
                                <h4>Начало</h4>
                                <h1>{item.date_start.split(' ')[0]}</h1>
                                <h4>{item.date_start.split(' ')[1]}</h4>
                            </div>
                        </div>
                        <h3 style={{textAlign: "left", width: "50%"}}>{item.name}</h3>
                        <Link to={item.hasOwnProperty('min_ball') ? `/task/${item.id}` : `/lektion/${item.id}`} style={{width: "20%"}}><button className='container-main-course-page-button'>Подробнее</button></Link>
                    </div>)
            }) : <h1>Заданий пока нет</h1>;
        }
    }

    const list = createList(taskAndLektionsList)
    console.log(list)
    const buyCourse = error === 'Необходимо купить курс!' ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><h1 style={{marginTop: "15vh"}}>Необходимо купить курс</h1></div> : null;
    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!' && error !== 'Необходимо купить курс!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;
    const content = !(loading || error || !taskAndLektionsList) ? <div className='container-main-course-page'>
        <div className='container-main-course-page-title'>
            <h1>Задания и лекции</h1>
        </div>
        <div className='container-main-course-page-list-container'>
            {list}
        </div>
        {teacher_buttons}
    </div> : null;

    return (
        <>
            {buyCourse}
            {unauthorized}
            {errorMessage}
            {spinner}
            {content}
        </>
    )
};

export default MainCoursePage;