import './profilePage.css'
import {useEffect, useState} from "react";
import useUserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import * as Yup from "yup";
import {useFormik} from "formik";

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const [errorSubmit, setErrorSubmit] = useState();
    const {loading, getUserBoard, error, clearError, refreshToken, editUserAdmin} = useUserService();

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required("Введите ваше имя"),
        lastname: Yup.string()
            .required("Введите вашу фамилию"),
        login: Yup.string()
            .required("Придумайте логин")
            .min(6, "Логин должен иметь минимум 6 символов")
            .max(20, "Логин не должен быть больше 20 символов"),
        email: Yup.string().required("Введите электронную почту").email("Неправильный адрес электронной почты")
    });

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            login: "",
            email: "",
        },
        validationSchema,
        onSubmit: (data) => {
            editUserAdmin(data.login, data.email, data.firstname, data.lastname).then(
                (message) => {
                    setErrorSubmit(message)
                    updateUser();
                }
            )
        }});

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                    updateUser()
                }
            );
        }
    },[error])

    useEffect(() => {
        updateUser()
    }, [])

    const updateUser = () => {
        clearError();
        getUserBoard()
            .then(onUserLoaded)
    }

    const onUserLoaded = (user) => {
        setUser(user);
    }

    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;

    const content = !(loading || error || !user) ? <div className='container-profile-page'>
        <div className='container-profile-page-column-1'>
            <div className='container-profile-page-user'>
                <h1>Мои данные</h1>
                <h2>Фамилия</h2>
                <h3>{user.last_name}</h3>
                <h2>Имя</h2>
                <h3>{user.first_name}</h3>
                <h2>Логин</h2>
                <h3>{user.username}</h3>
                <h2>E-mail</h2>
                <h3>{user.email}</h3>
            </div>
        </div>
        <div className='container-profile-page-column-1' style={{width: "40%"}}>
            <h1>Изменить данные</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="firstname">Имя</label>
                    {formik.errors.firstname && formik.touched.firstname ?
                        <input className='registration-page-invalid-input' type="text" name="firstname"
                               value={formik.values.firstname} onChange={formik.handleChange}>
                        </input> :
                        <input className='registration-page-input' type="text" name="firstname"
                               value={formik.values.firstname} onChange={formik.handleChange}>
                        </input>

                    }

                    <p style={{color: '#dc3545'}}>{formik.errors.firstname && formik.touched.firstname
                        ? formik.errors.firstname
                        : null}</p>
                </div>
                <div>
                    <label htmlFor="lastname">Фамилия</label>
                    {formik.errors.lastname && formik.touched.lastname ?
                        <input className='registration-page-invalid-input' type="text" name="lastname"
                               value={formik.values.lastname} onChange={formik.handleChange}>
                        </input> :
                        <input className='registration-page-input' type="text" name="lastname"
                               value={formik.values.lastname} onChange={formik.handleChange}>
                        </input>

                    }

                    <p style={{color: '#dc3545'}}>{formik.errors.lastname && formik.touched.lastname
                        ? formik.errors.lastname
                        : null}</p>
                </div>
                <div>
                    <label htmlFor="login">Логин</label>
                    {formik.errors.login && formik.touched.login ?
                        <input className='registration-page-invalid-input' type="text" name="login"
                               value={formik.values.login} onChange={formik.handleChange}>
                        </input> :
                        <input className='registration-page-input' type="text" name="login" value={formik.values.login}
                               onChange={formik.handleChange}>
                        </input>

                    }

                    <p style={{color: '#dc3545'}}>{formik.errors.login && formik.touched.login
                        ? formik.errors.login
                        : null}</p>
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    {formik.errors.email && formik.touched.email ?
                        <input className='registration-page-invalid-input' type="text" name="email"
                               value={formik.values.email} onChange={formik.handleChange}>
                        </input> :
                        <input className='registration-page-input' type="text" name="email" value={formik.values.email}
                               onChange={formik.handleChange}>
                        </input>

                    }

                    <p style={{color: '#dc3545'}}>{formik.errors.email && formik.touched.email
                        ? formik.errors.email
                        : null}</p>
                </div>
                <div style={{textAlign: 'center'}}>
                    <button type="submit" className='registration-page-button'>
                        Изменить
                    </button>
                </div>
                {errorSubmit ? <p style={{color: '#dc3545'}}>{errorSubmit}</p> : null}
            </form>
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

export default ProfilePage;