import './lektionPage.css'

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from '../spinner/Spinner';

import useUserService from "../../services/UserService";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const LektionPage = () => {
    const {lektionId} = useParams();

    const [lektion, setLektion] = useState({});

    const {getLektion, refreshToken, error, loading, clearError} = useUserService();

    useEffect(() => {
        updateLektion()
    }, [])

    useEffect(() => {
        if (error === 'Unauthorized! Access Token was expired!') {
            clearError();
            refreshToken().then(
                () => {
                    clearError();
                    updateLektion();
                }
            );
        }
    },[error])

    const updateLektion = () => {
        clearError();
        getLektion(lektionId)
            .then(onLektionLoaded)
    }

    const onLektionLoaded = (lektion) => {
        setLektion(lektion);
    }

    const unauthorized = error === 'Refresh token was expired. Please make a new signin request' || error === 'No token provided!' ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <h1 style={{marginTop: "15vh"}}>Вы не авторизованы</h1></div> : null;
    const errorMessage = error && error !== 'Unauthorized! Access Token was expired!' && error !== 'Refresh token was expired. Please make a new signin request' && error !== 'No token provided!'?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage/></div> : null;
    const spinner = loading ?
        <div style={{width: '100%', height: "100vh", display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Spinner/></div> : null;
    const content = !(loading || error || !lektion) ? <div className='container-lektion-page'>
        <div className='container-lektion-page-title'>
            <h1>{lektion.name}</h1>
        </div>
        <div className='container-lektion-page-video-container'>
            <iframe allowFullScreen={true} src={lektion.video}
                    style={{
                        width: "100%",
                        height: "100%",
                        allow: 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    }}>
            </iframe>
        </div>
    </div> : null;

    return (
        <>
            {unauthorized}
            {errorMessage}
            {spinner}
            {content}
        </>
    )

};

export default LektionPage;

