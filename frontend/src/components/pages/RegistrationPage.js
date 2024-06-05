import { useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import './registrationPage.css';

import AuthService from "../../services/AuthService";

import Spinner from '../spinner/Spinner';

const RegistrationPage = () => {
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required("Введите ваше имя"),
        lastname: Yup.string()
            .required("Введите вашу фамилию"),
        login: Yup.string()
            .required("Придумайте логин")
            .min(6, "Логин должен иметь минимум 6 символов")
            .max(20, "Логин не должен быть больше 20 символов"),
        email: Yup.string().required("Введите электронную почту").email("Неправильный адрес электронной почты"),
        password: Yup.string()
            .required("Придумайте пароль")
            .min(6, "Пароль должен иметь минимум 6 символов")
            .max(40, "Пароль не должен быть больше 40 символов"),
        confirm_password: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
        rules: Yup.bool().oneOf([true], 'Подтвердите оферту'),
        personal: Yup.bool().oneOf([true], 'Подтвердите согласие')
    });

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            login: "",
            email: "",
            password: "",
            confirm_password: "",
            rules: false,
            personal: false
        },
        validationSchema,
        onSubmit: (data) => {
            setLoading(true)
            AuthService.register(data.login, data.email, data.password, data.firstname, data.lastname, data.rules).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setLoading(false);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                    setLoading(false)
                }
            );
        }});

    const spinner = loading ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><Spinner/></div> : null;
    const congratulation = successful && !loading ?
        <div style={{display: 'flex', height: "90vh", width: '100%', justifyContent: 'center', marginTop: '10vh', flexDirection: 'row', alignItems: "center"}}>
            <h2>{message}</h2>
        </div> : null;
    const content = !successful && !loading ?
        <div style={{display: 'flex', width: '90%', justifyContent: 'center', margin: '5%', marginBottom: '30%', flexDirection: 'row', marginTop: "17vh"}}>
            <div style={{width: '40%', borderColor: 'green', borderWidth: '30px'}}>

                <h1>Регистрация</h1>
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
                            <input className='registration-page-input' type="text" name="login"
                                   value={formik.values.login} onChange={formik.handleChange}>
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
                            <input className='registration-page-input' type="text" name="email"
                                   value={formik.values.email} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : null}</p>
                    </div>
                    <div>
                        <label htmlFor="password">Пароль</label>
                        {formik.errors.password && formik.touched.password ?
                            <input className='registration-page-invalid-input' type="password" name="password"
                                   value={formik.values.password} onChange={formik.handleChange}>
                            </input> :
                            <input className='registration-page-input' type="password" name="password"
                                   value={formik.values.password} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : null}</p>
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Подтвердите пароль</label>
                        {formik.errors.confirm_password && formik.touched.confirm_password ?
                            <input className='registration-page-invalid-input' type="password" name="confirm_password"
                                   value={formik.values.confirm_password} onChange={formik.handleChange}>
                            </input> :
                            <input className='registration-page-input' type="password" name="confirm_password"
                                   value={formik.values.confirm_password} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.confirm_password && formik.touched.confirm_password
                            ? formik.errors.confirm_password
                            : null}</p>
                    </div>
                    <div style={{
                        display: "flex",
                        margin: "5% 5% 5% 0",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>

                        {formik.errors.rules && formik.touched.rules ?
                            <input style={{width: '10%'}} className='registration-page-invalid-input' type="checkbox"
                                   name="rules" onChange={formik.handleChange}>
                            </input> :
                            <input style={{width: '10%'}} className='registration-page-input' type="checkbox"
                                   name="rules" onChange={formik.handleChange}>
                            </input>

                        }
                        <label htmlFor="rules">Соглашение об оферте</label>
                        <p style={{color: '#dc3545'}}>{formik.errors.rules && formik.touched.rules
                            ? formik.errors.rules
                            : null}</p>
                    </div>
                    <div style={{
                        display: "flex",
                        margin: "5% 5% 5% 0",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>

                        {formik.errors.personal && formik.touched.personal ?
                            <input style={{width: '10%'}} className='registration-page-invalid-input' type="checkbox"
                                   name="personal" onChange={formik.handleChange}>
                            </input> :
                            <input style={{width: '10%'}} className='registration-page-input' type="checkbox"
                                   name="personal" onChange={formik.handleChange}>
                            </input>

                        }
                        <label htmlFor="personal">Я согласен на обработку персональных данных</label>
                        <p style={{color: '#dc3545'}}>{formik.errors.personal && formik.touched.personal
                            ? formik.errors.personal
                            : null}</p>
                    </div>
                    <div style={{textAlign: 'center'}}>
                    <button type="submit" className='registration-page-button'>
                            Зарегестрироваться
                        </button>
                    </div>
                    {message ? <p style={{color: '#dc3545'}}>{message}</p> : null}
                </form>
            </div>

        </div> : null;

    return (
        <>
            {spinner}
            {congratulation}
            {content}
        </>
    );
};

export default RegistrationPage;