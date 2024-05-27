import './footer.css';

import phone from '../../img/phone.svg';
import email from '../../img/email.svg';

import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className='container-footer'>
            <div className='container-column'>
                <h1>Glow</h1>
                <p>Онлайн-школа Glow является лидером в области онлайн-обучения.
                    У нас есть множество курсов и программ от ведущих экспертов рынка.
                    Мы предлагаем актуальные подходы к онлайн-обучению и гарантируем ваше трудойстройство.</p>
            </div>
            <div className='container-column'>
                <h2>Карта сайта</h2>
                <Link to={"/about"}>
                    <h3>О нас</h3>
                </Link>
                <Link to={"/reviews"}>
                    <h3>Отзывы</h3>
                </Link>
                <Link to={"/login"}>
                    <h3>Вход</h3>
                </Link>
                <Link to={"/register"}>
                    <h3>Регистрация</h3>
                </Link>
            </div>
            <div className='container-column'>
                <h2>Контакты</h2>
                <div style={{width: '100%', marginBottom: "7%", marginTop: "7%"}}>
                    <img src={phone} style={{marginRight: "3%", width: "8%", verticalAlign: "top"}}/>
                    <h3 style={{display: "inline"}}>8 (904) 052-67-28</h3>
                </div>
                <div style={{width: '100%', marginBottom: "7%", marginTop: "7%"}}>
                    <img src={email} style={{marginRight: "3%", width: "8%", verticalAlign: "top"}}/>
                    <h3 style={{display: "inline"}}>glow-courses@gmail.com</h3>
                </div>
            </div>
        </div>
    )
};

export default Footer;