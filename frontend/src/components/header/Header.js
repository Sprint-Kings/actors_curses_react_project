import './Header.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthService from "../../services/AuthService";
import EventBus from "../../services/EventBus";

function Header() {
    const [currentUser, setCurrentUser] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            const roles = localStorage.getItem("roles")
            setShowAdminBoard(roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowAdminBoard(false);
        setCurrentUser(false);
    };

    return (

            <div className='container-header'>
                <div className='logo'>
                    <Link to={'/'} style={{ textDecoration: 'none'}}>
                        <h2>Glow</h2>
                    </Link>
                </div>

                <div className='navigation'>
                    <Link to={'/about'} style={{ textDecoration: 'none', color: '#424551'}}><button><h2>О нас</h2></button></Link>
                    <Link to={'/reviews'} style={{ textDecoration: 'none', color: '#424551'}}><button><h2>Отзывы</h2></button></Link>
                </div>

                <div className='user-menu'>
                    {currentUser !== false ? (
                        <>
                            {showAdminBoard ?
                                <Link to={'/admin'} style={{ textDecoration: 'none'}}>
                                    <h2 style={{color: "#424551"}}>Админ</h2>
                                </Link> : null}
                                <Link to={'/user/course'} style={{ textDecoration: 'none'}}>
                                    <h2  style={{color: "#424551"}}>Мой курс</h2>
                                </Link>
                                <Link to={'/profile'} style={{ textDecoration: 'none'}}>
                                    <h2  style={{color: "#424551"}}>Аккаунт</h2>
                                </Link>
                                <Link to={'/'} style={{ textDecoration: 'none'}} onClick={() => {logOut();}}>
                                    <h2  style={{color: "#424551"}}>Выход</h2>
                                </Link>
                        </>) : (
                        <>
                            <Link to={'/login'} style={{textDecoration: 'none'}}>
                                <h2  style={{color: "#424551"}}>Вход</h2>
                            </Link>
                            <Link to={'/register'} style={{textDecoration: 'none'}}>
                                <h2  style={{color: "#424551"}}>Регистрация</h2>
                            </Link>
                        </>
                    )}
                </div>
            </div>

    );
}
// #f8bc48
//#4dbd3a
//#2a556c
//#2f3c43
export default Header;