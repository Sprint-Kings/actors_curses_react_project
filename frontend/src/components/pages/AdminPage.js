import { useEffect, useState } from "react";
import useUserService from '../../services/UserService';
import { useFormik } from "formik";
import * as Yup from 'yup';

import './adminPage.css';

import Spinner from '../spinner/Spinner';
import ErrorMessage from "../errorMessage/ErrorMessage";
import {string} from "yup";

const AdminPage = () => {
    const [contentType, setContentType] = useState('users')
    const {loading, error, clearError, refreshToken, getUsersAdmin, addUserAdmin, deleteUser, getCoursesAdmin, addCourseAdmin, deleteCourse} = useUserService();

    const renderContent = () => {
        if (contentType === 'users') {
            const content = <ViewUsers loading={loading} getUsersAdmin={getUsersAdmin} clearError={clearError} addUserAdmin={addUserAdmin} refreshToken={refreshToken} error={error} deleteUser={deleteUser}/>
            return content
        }
        if (contentType === 'courses') {
            const content = <ViewCourses loading={loading} getCoursesAdmin={getCoursesAdmin} clearError={clearError} addCourseAdmin={addCourseAdmin} refreshToken={refreshToken} error={error} deleteCourse={deleteCourse}/>
            return content
        }
    }

    const content = renderContent();
    return (
        <>
            <div style={{marginTop: "10vh", display: "flex", width: "100%", height: "10vh", justifyContent: "center", alignItems: "center"}}>
                <button className='admin-page-button-choice' onClick={() => setContentType('users')}>Пользователи</button>
                <button className='admin-page-button-choice' onClick={() => setContentType('courses')}>Курсы</button>
            </div>
            {content}
        </>
    );
};

const ViewUsers = ({loading, getUsersAdmin, clearError, addUserAdmin, error, refreshToken, deleteUser}) => {
    const [users, setUsers] = useState([]);
    const [errorSubmit, setErrorSubmit] = useState();

    useEffect(() => {
        updateUsers();
    }, [])

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Введите логин")
            .min(6, "Логин должен иметь минимум 6 символов")
            .max(20, "Логин не должен быть больше 20 символов"),
        email: Yup.string()
            .required('Введите адрес электронной почты')
            .email("Неправильный адрес электронной почты"),
        first_name: Yup.string()
            .required('Введите имя'),
        last_name: Yup.string()
            .required('Введите фамилию'),
        password: Yup.string()
            .required('Введите пароль'),
        accepted_oferta: Yup.bool().oneOf([true], 'Подтвердите оферту'),
        role: Yup.string()
            .required('Введите роль'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            accepted_oferta: false,
            role: "user"
        }, validationSchema,
        onSubmit: (data, helpers) => {
            addUserAdmin(data.username, data.email, data.first_name, data.last_name, data.password, data.accepted_oferta, data.role).then(
                () => {
                    setErrorSubmit(null)
                    updateUsers();
                }
            )
            .catch(error => {
                console.log('hier')
                setErrorSubmit(error.message)
                updateUsers();
            })
            if (!error) {
                helpers.resetForm({
                    data
                });
            }
        }});

    useEffect(() => {
        console.log(error)
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    updateUsers()
                }
            );
        }
    },[error])

    const updateUsers= () => {
        clearError();
        getUsersAdmin()
            .then(onUsersLoaded);
    }

    const onUsersLoaded = (users) => {
        setUsers(users);
    }

    const removeUser = (id) => {
        delete deleteUser(id).then(
            () => {
                updateUsers();
            })
    }


    function createUsersList(users) {
        if (!error) {
            if (users.length !== 0) {
                const list = users.map(user => {
                    return <tr>
                        <td style={{borderLeft: 0}}>{user.id}</td>
                        <td>{user.last_name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{String(user.accepted_oferta)}</td>
                        <td>{user.roles[0].name}</td>
                        <td style={{borderRight: 0}}>
                            <p className="admin-page-button" style={{textAlign: 'center'}}
                               onClick={() => removeUser(user.id)}>
                                Удалить
                            </p>
                        </td>
                    </tr>
                })
                return list
            } else {
                return <></>
            }
        } else {
            return <></>
        }
    }

    const usersList = createUsersList(users)

    const adminError = error === 'Необходима роль администратора' ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><h1 style={{marginTop: "15vh"}}>{error}</h1></div> : null;
    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && !errorSubmit && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!' && error !== 'Необходима роль администратора' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;
    const content = !(loading || (error && (errorSubmit === 'Refresh token was expired. Please make a new signin request' || errorSubmit === null))) ?
        <div className="admin-page-container">
            <h1>Список пользователей</h1>
            <form onSubmit={formik.handleSubmit} style={{width: '80%'}}>
                <table className="admin-page-table">
                    <tr>
                        <td style={{borderLeft: 0, fontWeight: 600}}><p>id</p></td>
                        <td style={{fontWeight: 600}}>фамилия</td>
                        <td style={{fontWeight: 600}}>имя</td>
                        <td style={{fontWeight: 600}}>логин</td>
                        <td style={{fontWeight: 600}}>e-mail</td>
                        <td style={{fontWeight: 600}}>оферта</td>
                        <td style={{fontWeight: 600}}>роль</td>
                        <td></td>
                    </tr>
                    {usersList}
                    <tr>
                        <td style={{borderLeft: 0}}>
                            <input
                                placeholder="фамилия"
                                type="text"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.last_name && formik.touched.last_name
                                ? <p className="admin-page-invalid-message">{formik.errors.last_name}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="имя"
                                type="text"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.first_name && formik.touched.first_name
                                ? <p className="admin-page-invalid-message">{formik.errors.first_name}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="логин"
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.username && formik.touched.username
                                ? <p className="admin-page-invalid-message">{formik.errors.username}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="e-mail"
                                type="text"
                                name="email"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.email && formik.touched.email
                                ? <p className="admin-page-invalid-message">{formik.errors.email}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="пароль"
                                type="text"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.password && formik.touched.password
                                ? <p className="admin-page-invalid-message">{formik.errors.password}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="оферта"
                                type="checkbox"
                                name="accepted_oferta"
                                value={formik.values.accepted_oferta}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.accepted_oferta && formik.touched.accepted_oferta
                                ? <p className="admin-page-invalid-message">{formik.errors.accepted_oferta}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="роль"
                                type="text"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.role && formik.touched.role
                                ? <p className="admin-page-invalid-message">{formik.errors.role}</p>
                                : null}
                        </td>
                    </tr>
                </table>
                <button className='admin-page-button-submit' type="submit">
                    Добавить
                </button>
                <p className='admin-page-invalid-message'>{errorSubmit}</p>
            </form>
        </div> : null;
    return (
        <>
            {adminError}
            {errorMessage}
            {unauthorized}
            {spinner}
            {content}
        </>
    );
}

const ViewCourses = ({loading, getCoursesAdmin, clearError, addCourseAdmin, error, refreshToken, deleteCourse}) => {
    const [courses, setCourses] = useState([]);
    const [errorSubmit, setErrorSubmit] = useState();

    useEffect(() => {
        updateCourses();
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Введите название"),
        teacher: Yup.string()
            .required('Введите фио учителя'),
        description: Yup.string()
            .required('Введите описание курса'),
        duration: Yup.number()
            .required('Введите длительность курса'),
        price: Yup.number()
            .required('Введите цену курса'),
        preview: Yup.string()
            .required('Введите адрес изображения курса'),
        specialization: Yup.string()
            .required('Введите специализацию учителя'),
        teacher_description: Yup.string()
            .required('Введите описание учителя'),
        teacher_image: Yup.string()
            .required('Введите адрес изображения учителя'),
        teacherId: Yup.string()
            .required('Введите id учителя'),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            teacher: "",
            description: "",
            duration: "",
            price: "",
            preview: "",
            specialization: "",
            teacher_description: "",
            teacher_image: "",
            teacherId: ""
        }, validationSchema,
        onSubmit: (data, helpers) => {
            addCourseAdmin(data.name, data.teacher, data.description, data.duration,
                data.price, data.teacherId, data.preview, data.specialization,
                data.teacher_description, data.teacher_image).then(
                () => {
                    setErrorSubmit(null)
                    updateCourses();
                }
            )
                .catch(error => {
                    setErrorSubmit(error.message)
                    updateCourses();
                })
            if (!error) {
                helpers.resetForm({
                    data
                });
            }
        }});

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                    updateCourses()
                }
            );
        }
    },[error])

    const updateCourses= () => {
        clearError();
        getCoursesAdmin()
            .then(onCoursesLoaded);
    }

    const onCoursesLoaded = (courses) => {
        setCourses(courses);
    }

    const removeCourse = (id) => {
        delete deleteCourse(id).then(
            () => {
                updateCourses();
            })
    }


    function createCoursesList(courses) {
        if (!error) {
            if (courses.length !== 0) {
                const list = courses.map(course => {
                    return <tr>
                        <td style={{borderLeft: 0}}>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.teacher}</td>
                        <td>{course.description}</td>
                        <td>{course.duration}</td>
                        <td>{course.price}</td>
                        <td>{course.preview}</td>
                        <td>{course.specialization}</td>
                        <td>{course.teacher_description}</td>
                        <td>{course.teacher_image}</td>
                        <td>{course.teacherId}</td>
                        <td style={{borderRight: 0}}>
                            <p className="admin-page-button" style={{textAlign: 'center'}}
                               onClick={() => removeCourse(course.id)}>
                                Удалить
                            </p>
                        </td>
                    </tr>
                })
                return list
            } else {
                return <></>
            }
        } else {
            return <></>
        }
    }

    const coursesList = createCoursesList(courses)

    const adminError = error === 'Необходима роль администратора' ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><h1 style={{marginTop: "15vh"}}>{error}</h1></div> : null;
    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && !errorSubmit && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!' && error !== 'Необходима роль администратора' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;
    const content = !(loading || (error && (errorSubmit === 'Refresh token was expired. Please make a new signin request' || errorSubmit === null))) ?
        <div className="admin-page-container">
            <h1>Список курсов</h1>
            <form onSubmit={formik.handleSubmit} style={{width: '90%'}}>
                <table className="admin-page-table" style={{fontSize: "calc( (60vw - 1rem)/70)"}}>
                    <tr>
                        <td style={{borderLeft: 0, fontWeight: 600}}><p>id</p></td>
                        <td style={{fontWeight: 600}}>название</td>
                        <td style={{fontWeight: 600}}>учитель</td>
                        <td style={{fontWeight: 600}}>описание курса</td>
                        <td style={{fontWeight: 600}}>длительность</td>
                        <td style={{fontWeight: 600}}>цена</td>
                        <td style={{fontWeight: 600}}>картинка курса</td>
                        <td style={{fontWeight: 600}}>специализация учителя</td>
                        <td style={{fontWeight: 600}}>описание учителя</td>
                        <td style={{fontWeight: 600}}>картинка учителя</td>
                        <td style={{fontWeight: 600}}>id учителя</td>
                        <td></td>
                    </tr>
                    {coursesList}
                    <tr>
                        <td style={{borderLeft: 0}}></td>
                        <td>
                            <input
                                placeholder="название"
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.name && formik.touched.name
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.name}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="учитель"
                                type="text"
                                name="teacher"
                                value={formik.values.teacher}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.teacher && formik.touched.teacher
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.teacher}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="описание курса"
                                type="text"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.description && formik.touched.description
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.description}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="длительность"
                                type="text"
                                name="duration"
                                value={formik.values.duration}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.duration && formik.touched.duration
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.duration}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="цена"
                                type="text"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.price && formik.touched.price
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.price}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="картинка курса"
                                type="text"
                                name="preview"
                                value={formik.values.preview}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.preview && formik.touched.preview
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.preview}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="специализация учителя"
                                type="text"
                                name="specialization"
                                value={formik.values.specialization}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.specialization && formik.touched.specialization
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.specialization}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="описание учителя"
                                type="text"
                                name="teacher_description"
                                value={formik.values.teacher_description}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.teacher_description && formik.touched.teacher_description
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.teacher_description}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="картинка учителя"
                                type="text"
                                name="teacher_image"
                                value={formik.values.teacher_image}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.teacher_image && formik.touched.teacher_image
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.teacher_image}</p>
                                : null}
                        </td>
                        <td>
                            <input
                                placeholder="id учителя"
                                type="text"
                                name="teacherId"
                                value={formik.values.teacherId}
                                onChange={formik.handleChange}
                                className='admin-page-input'
                            />
                            {formik.errors.teacherId && formik.touched.teacherId
                                ? <p className="admin-page-invalid-message"
                                     style={{fontSize: "calc( (60vw - 1rem)/70)"}}>{formik.errors.teacherId}</p>
                                : null}
                        </td>
                    </tr>
                </table>
                <button className='admin-page-button-submit' type="submit">
                    Добавить
                </button>
                <p className='admin-page-invalid-message'>{errorSubmit}</p>
            </form>
        </div> : null;
    return (
        <>
            {adminError}
            {errorMessage}
            {unauthorized}
            {spinner}
            {content}
        </>
    );
}
export default AdminPage;