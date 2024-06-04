import { useState, useEffect } from 'react';

import illustration from "../../img/illustration.jpg";
import why from "../../img/why.jpg";
import check from "../../img/check.svg";
import certificate from "../../img/certificate.jpg";
import logo1 from "../../img/companyLogo1.jpg";
import logo2 from "../../img/companyLogo2.jpg";
import logo3 from "../../img/companyLogo3.jpg";

import './mainPage.css';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import CartCourse from "../cartCourse/CartCourse";

import useCourseService from '../../services/CourseService';
const MainPage = () => {
    const [courseList, setCourseList] = useState([]);

    const {getAllCourses, loading, error, clearError} = useCourseService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        clearError();
        getAllCourses()
            .then(onCourseListLoaded)
    }

    const onCourseListLoaded = (newCourseList) => {
        setCourseList(newCourseList);
    }

    function renderItems(arr) {

        const items =  arr.map((item, i) => {
            return <CartCourse course={item}/>
        });

        const errorMessage = error ? <div className='container-error-loading'>
            <ErrorMessage/></div> : null;
            const spinner = loading ? <div className='container-error-loading'><Spinner/></div> : null;
        const content = !(loading || error || !courseList) ? items : null;

        return (
            <>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
    }

    const courses = renderItems(courseList);
    return (
        <div className='container-main-page'>
            <div className='container-slide-1'>
                <div className='container-slide-1-big-row'>
                    <div className='container-slide-1-big-row-text-container'>
                        <h1>Наслаждайтесь обучением с помощью онлайн-курсов Glow</h1>
                    </div>
                    <div className='container-slide-1-big-row-image-container'>
                        <img src={illustration} className='container-slide-1-big-row-image'></img>
                    </div>
                </div>
                <div className='container-slide-1-small-row'>
                    <h1 style={{marginLeft: "6%"}}>200</h1>
                    <p>студентов получили сертификат</p>
                    <span className='circle'></span>
                    <h1>3</h1>
                    <p>доступных курса</p>
                    <span className='circle'></span>
                    <h1>3</h1>
                    <p>преподавателя</p>
                </div>
            </div>
            <div className='container-slide-2'>
                <div className='container-slide-2-image-column-container'>
                    <img src={why} className='container-slide-2-image'></img>
                </div>
                <div className='container-slide-2-text-column-container'>
                    <h3>Кто мы такие</h3>
                    <h1>Почему Glow?</h1>
                    <div className='container-slide-2-label-container'>
                        <img src={check}></img>
                        <p>Профессиональные преподаватели</p>
                    </div>
                    <div className='container-slide-2-label-container'>
                        <img src={check}></img>
                        <p>Современный подход к обучению</p>
                    </div>
                    <div className='container-slide-2-label-container'>
                        <img src={check}></img>
                        <p>Возможность будущего трудоустройства</p>
                    </div>
                    <div className='container-slide-2-label-container'>
                        <img src={check}></img>
                        <p>Разделение обучения на лекции и практики</p>
                    </div>
                    <div className='container-slide-2-label-container'>
                        <img src={check}></img>
                        <p>Постоянный контакт с преподавателем</p>
                    </div>
                    <div className='container-slide-2-label-container'>
                        <img src={check}></img>
                        <p>Аккредитованность международными организациями</p>
                    </div>
                </div>
            </div>
            <div className='container-slide-3'>
                <div className='container-slide-3-title-container'>
                    <h3>Готовы учиться?</h3>
                    <h1>Наши курсы</h1>
                </div>
                <div className='container-slide-3-courses-container'>
                    {courses}
                </div>
            </div>
            <div className='container-slide-4'>
                <div className='container-slide-4-text-container'>
                    <h3 style={{fontWeight: "normal"}}>Glow сертификат</h3>
                    <h1>Ваши знания будут подтверждены</h1>
                    <p>Мы аккредитованы международными профессиональными организациями и институтами:</p>
                    <div className='container-slide-4-logos-container'>
                        <img src={logo1} className='container-slide-4-logo'/>
                        <img src={logo2} className='container-slide-4-logo'/>
                        <img src={logo3} className='container-slide-4-logo'/>
                    </div>
                </div>
                <div className='container-slide-4-image-container'>
                    <img src={certificate} className='container-slide-4-image'/>
                </div>
            </div>
        </div>
    )
}

export default MainPage;