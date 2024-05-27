import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import './coursePage.css';

import teacher from '../../img/teacher.jpg';

import useCourseService from "../../services/CourseService";
import useUserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const CoursePage = () => {
    const {courseId} = useParams();

    const [course, setCourse] = useState(null);
    const [message, setMessage] = useState(null);
    const [teacher, setTeacher] = useState(false)

    const {loading, getCourse} = useCourseService();
    const {buyCourse, refreshToken, error, clearError} = useUserService();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            const roles = localStorage.getItem("roles")
            setTeacher(roles.includes("ROLE_TEACHER"))
        }
        clearError();
        updateCourse()
    }, [])


    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                    submit();
                }
            );
        }
        if (error === 'No token provided!') {
            clearError();
            setMessage("Вы не авторизованы");
            updateCourse();
        }
    },[error])

    const submit = () => {
        clearError();
        buyCourse(courseId)
            .then((message) => setMessage(message))
    }

    const updateCourse = () => {
        clearError();
        getCourse(courseId)
            .then(onCourseLoaded)
    }

    const onCourseLoaded = (course) => {
        setCourse(course);
    }

    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;
    const content = !(loading || error || !course) ? <div className='container-course-page'>
        <div className='container-course-page-title'>
            <h3>Курс</h3>
            <h1>{course.name}</h1>
        </div>
        <div className='container-course-page-about-course'>
            <div className='container-course-page-about-course-text'>
                <h1>О курсе</h1>
                <p>{course.description}</p>
            </div>
            <div className='container-course-page-about-course-information-card'>
                <h4>Длительность</h4>
                <h2>{course.duration} дней</h2>
                <h4>Цена</h4>
                <h2>{course.price} ₽</h2>
                {!teacher ? <button onClick={() => submit()} className='container-course-page-about-course-button'>Купить</button> : null}
                {message}
            </div>
        </div>
        <div className='container-course-page-about-teacher'>
            <div className='container-course-page-about-teacher-image-container'>
                <img src={course.teacher} className='container-course-page-about-teacher-image'/>
            </div>
            <div className='container-course-page-about-teacher-text'>
                <h3>Преподаватель</h3>
                <h1>{course.teacher}</h1>
                <h4>{course.specialization}</h4>
                <p>{course.teacherDescription}</p>
            </div>
        </div>
    </div> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
};

export default CoursePage;