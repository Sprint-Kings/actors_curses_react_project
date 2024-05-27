import './createTaskOrLektionPage.css';
import './registrationPage.css';

import {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import Spinner from '../spinner/Spinner';
import ErrorMessage from "../errorMessage/ErrorMessage";

import useUserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
const CreateTaskOrLektionPage = () => {

    const [message, setMessage] = useState()

    const {addTaskTeacher, addLektionTeacher, refreshToken, error, loading, clearError} = useUserService();

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                }
            );
        }
    },[error])

    const validationSchemaTask = Yup.object().shape({
        name: Yup.string()
            .required("Введите название"),
        description: Yup.string()
            .required("Введите описание"),
        min_ball: Yup.number()
            .required("Введите минимальный балл"),
        date_start: Yup.string()
            .required("Введите дату начала")
    });

    const validationSchemaLektion = Yup.object().shape({
        name: Yup.string()
            .required("Введите название"),
        video: Yup.string()
            .required("Введите ссылку на видео"),
        date_start: Yup.string()
            .required("Введите дату начала")
    });

    const formikTask = useFormik({
        initialValues: {
            name: "",
            description: "",
            min_ball: 0,
            date_start: ""
        },
        validationSchema: validationSchemaTask,
        onSubmit: (data) => {
            clearError();
            addTaskTeacher(data.name, data.description, false, data.min_ball, data.date_start).then(
                (message) => {
                    setMessage(message)
                }
            );
        }});

    const formikLektion = useFormik({
        initialValues: {
            name: "",
            video: "",
            date_start: ""
        },
        validationSchema: validationSchemaLektion,
        onSubmit: (data) => {
            clearError();
            addLektionTeacher(data.name, data.video, false, data.date_start).then(
                (message) => {
                    setMessage(message)
                }
            );
        }});

    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><Spinner/></div> : null;
    const content = !loading ? <>
        <div style={{display: "flex", width: "100%", height: "85vh"}}>

            <div style={{
                display: 'flex',
                width: '50%',
                justifyContent: 'center',
                margin: '5%',
                marginBottom: '40%',
                flexDirection: 'row',
                marginTop: "17vh"
            }}>
                <div style={{width: '70%', borderColor: 'green', borderWidth: '30px', marginTop: "13%"}}>

                    <h1>Добавить задание</h1>
                    <form onSubmit={formikTask.handleSubmit}>
                        <div>
                            <label htmlFor="name">Название</label>
                            {formikTask.errors.name && formikTask.touched.name ?
                                <input className='registration-page-invalid-input' type="text" name="name"
                                       value={formikTask.values.name} onChange={formikTask.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="name"
                                       value={formikTask.values.name} onChange={formikTask.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikTask.errors.name && formikTask.touched.name
                                ? formikTask.errors.name
                                : null}</p>
                        </div>
                        <div>
                            <label htmlFor="description">Описание</label>
                            {formikTask.errors.description && formikTask.touched.description ?
                                <input className='registration-page-invalid-input' type="text" name="description"
                                       value={formikTask.values.description} onChange={formikTask.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="description"
                                       value={formikTask.values.description} onChange={formikTask.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikTask.errors.description && formikTask.touched.description
                                ? formikTask.errors.description
                                : null}</p>
                        </div>
                        <div>
                            <label htmlFor="min_ball">Минимальный балл</label>
                            {formikTask.errors.min_ball && formikTask.touched.min_ball ?
                                <input className='registration-page-invalid-input' type="text" name="min_ball"
                                       value={formikTask.values.min_ball} onChange={formikTask.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="min_ball"
                                       value={formikTask.values.min_ball} onChange={formikTask.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikTask.errors.min_ball && formikTask.touched.min_ball
                                ? formikTask.errors.min_ball
                                : null}</p>
                        </div>
                        <div>
                            <label htmlFor="date_start">Дата начала</label>
                            {formikTask.errors.date_start && formikTask.touched.date_start ?
                                <input className='registration-page-invalid-input' type="text" name="date_start"
                                       value={formikTask.values.date_start} onChange={formikTask.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="date_start"
                                       value={formikTask.values.date_start} onChange={formikTask.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikTask.errors.date_start && formikTask.touched.date_start
                                ? formikTask.errors.date_start
                                : null}</p>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <button className='registration-page-button' type="submit">
                                Добавить задание
                            </button>
                        </div>

                    </form>

                </div>
            </div>
            <div style={{
                display: 'flex',
                width: '50%',
                justifyContent: 'center',
                margin: '5%',
                marginBottom: '40%',
                flexDirection: 'row',
                marginTop: "17vh"
            }}>
                <div style={{width: '70%', borderColor: 'green', borderWidth: '30px', marginTop: "13%"}}>
                    <h1>Добавить лекцию</h1>
                    <form onSubmit={formikLektion.handleSubmit}>
                        <div>
                            <label htmlFor="name">Название</label>
                            {formikLektion.errors.name && formikLektion.touched.name ?
                                <input className='registration-page-invalid-input' type="text" name="name"
                                       value={formikLektion.values.name} onChange={formikLektion.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="name"
                                       value={formikLektion.values.name} onChange={formikLektion.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikLektion.errors.name && formikLektion.touched.name
                                ? formikLektion.errors.name
                                : null}</p>
                        </div>
                        <div>
                            <label htmlFor="video">Ссылка на видео</label>
                            {formikLektion.errors.video && formikLektion.touched.video ?
                                <input className='registration-page-invalid-input' type="text" name="video"
                                       value={formikLektion.values.video} onChange={formikLektion.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="video"
                                       value={formikLektion.values.video} onChange={formikLektion.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikLektion.errors.video && formikLektion.touched.video
                                ? formikLektion.errors.video
                                : null}</p>
                        </div>
                        <div>
                            <label htmlFor="date_start">Дата начала</label>
                            {formikLektion.errors.date_start && formikLektion.touched.date_start ?
                                <input className='registration-page-invalid-input' type="text" name="date_start"
                                       value={formikLektion.values.date_start} onChange={formikLektion.handleChange}>
                                </input> :
                                <input className='registration-page-input' type="text" name="date_start"
                                       value={formikLektion.values.date_start} onChange={formikLektion.handleChange}>
                                </input>

                            }

                            <p style={{color: '#dc3545'}}>{formikLektion.errors.date_start && formikLektion.touched.date_start
                                ? formikLektion.errors.date_start
                                : null}</p>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <button className='registration-page-button' type="submit">
                                Добавить лекцию
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>{message ? <div style={{display: "flex", width: "100%", justifyContent: "center", marginBottom: "5%"}}><h3>{message}</h3></div> : null}</> : null;
    return (
        <>
            {unauthorized}
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default CreateTaskOrLektionPage;