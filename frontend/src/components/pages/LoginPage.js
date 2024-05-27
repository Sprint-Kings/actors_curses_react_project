import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';

import './registrationPage.css'

import AuthService from "../../services/AuthService";

import Spinner from '../spinner/Spinner';

const LoginPage = () => {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Введите логин"),
        password: Yup.string()
            .required("Введите пароль")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: (data) => {
            setLoading(true)
            AuthService.login(data.username, data.password).then(
                () => {
                    setLoading(false)
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setLoading(false)
                }
            );

        }});

    const spinner = loading ? <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}><Spinner/></div> : null;
    const content = !loading ?
        <div style={{display: 'flex', width: '90%', justifyContent: 'center', margin: '5%', marginBottom: '40%', flexDirection: 'row', marginTop: "17vh"}}>
            <div style={{width: '40%', borderColor: 'green', borderWidth: '30px', marginTop: "13%"}}>

                <h1>Вход</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username">Логин</label>
                        {formik.errors.username && formik.touched.username ?
                            <input className='registration-page-invalid-input' type="text" name="username" value={formik.values.username} onChange={formik.handleChange}>
                            </input> :
                            <input  className='registration-page-input' type="text" name="username" value={formik.values.username} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.username && formik.touched.username
                            ? formik.errors.username
                            : null}</p>
                    </div>
                    <div>
                        <label htmlFor="password">Пароль</label>
                        {formik.errors.password && formik.touched.password ?
                            <input className='registration-page-invalid-input' type="password" name="password" value={formik.values.password} onChange={formik.handleChange}>
                            </input> :
                            <input  className='registration-page-input' type="password" name="password" value={formik.values.password} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : null}</p>
                    </div>
                    <div style ={{textAlign: 'center'}}>
                        <button className='registration-page-button' type="submit">
                            Войти
                        </button>
                    </div>
                    { message ? <p style={{color: '#dc3545'}}>{message}</p> : null}
                </form>

            </div>
        </div> : null;
    return (
        <>
            {spinner}
            {content}
        </>
    );
};

export default LoginPage;