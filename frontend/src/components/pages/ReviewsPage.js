import './reviewsPage.css';

import braces from '../../img/braces.svg';
import user from '../../img/user.jfif';
import review2 from '../../img/review2.jpg';

import {useState} from "react";
import * as Yup from "yup";
import useUserService from "../../services/UserService";
import {useFormik} from "formik";
const ReviewsPage = () => {
    const [message, setMessage] = useState()

    const {addReview, error, loading, clearError} = useUserService();

    const validationSchema = Yup.object().shape({
        last_name: Yup.string()
            .required("Введите фамилию"),
        first_name: Yup.string()
            .required("Введите имя"),
        review: Yup.string()
            .required("Напишите отзыв"),
    });

    const formik = useFormik({
        initialValues: {
            last_name: "",
            first_name: "",
            review: ""
        },
        validationSchema,
        onSubmit: (data) => {
            clearError();
            addReview(data.first_name, data.last_name, data.review).then(
                (message) => {
                    setMessage(message)
                }
            );
        }});

    return (
        <div className='container-reviews-page'>
            <h1 style={{marginTop: "5%"}}>Наши отзывы</h1>
            <div className='container-reviews-review' style={{marginTop: "10%"}}>
                <div className='container-reviews-review-text'>
                    <img src={braces}/>
                    <p>Я проходила курс «Дикция и артикуляция». В начале занятий я с трудом
                        произносила скороговорки, а к концу курса начала быстрее проговаривать
                        сложные звукосочетания. Я узнала, как сделать голос громче и звонче,
                        а также научилась дышать правильно. Теперь могу легко выступать
                        перед публикой.</p>
                </div>
                <div className='container-reviews-review-author'>
                    <img src={user}/>
                    <p>Елена Николаева</p>
                </div>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "11%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "8%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end", margin: "2% 0 2% 0"}}>
                <span className='circle-reviews' style={{marginRight: "7%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "8%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "11%"}}></span>
            </div>
            <div className='container-reviews-review'>
                <div className='container-reviews-review-text'>
                    <img src={braces}/>
                    <p>Я проходила курс «Мастерство актёра». Здесь я изучила основы сценического
                        движения и речи. Узнала, как играть роли, работать над образами и
                        перевоплощаться. Мне было сложно на занятиях по сценической речи, но
                        благодаря педагогам я поняла, как избавиться от речевых дефектов.
                        Также я научилась пластично двигаться и работать с партнёрами.</p>
                </div>
                <div className='container-reviews-review-author'>
                    <img src={user}/>
                    <p>Eleanor Pena</p>
                </div>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-start"}}>
                <span className='circle-reviews' style={{marginLeft: "11%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-start"}}>
                <span className='circle-reviews' style={{marginLeft: "8%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-start", margin: "2% 0 2% 0"}}>
                <span className='circle-reviews' style={{marginLeft: "7%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-start"}}>
                <span className='circle-reviews' style={{marginLeft: "8%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-start"}}>
                <span className='circle-reviews' style={{marginLeft: "11%"}}></span>
            </div>
            <div className='container-reviews-review'>
                <div className='container-reviews-review-text'>
                    <img src={braces}/>
                    <p>Я проходила курс «Техника речи». Этот курс помог мне улучшить дикцию и научил
                        управлять интонацией. Педагоги показали мне, как правильно дышать во
                        время разговора, чтобы не прерываться. Благодаря этому курсу я стала
                        лучше говорить и даже смогла выступить на конференции.</p>
                </div>
                <div className='container-reviews-review-author'>
                    <img src={user}/>
                    <p>Eleanor Pena</p>
                </div>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "11%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "8%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end", margin: "2% 0 2% 0"}}>
                <span className='circle-reviews' style={{marginRight: "7%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "8%"}}></span>
            </div>
            <div className='circle-container' style={{justifyContent: "flex-end"}}>
                <span className='circle-reviews' style={{marginRight: "11%"}}></span>
            </div>
            <div className='container-reviews-review' style={{marginBottom: '10%'}}>
                <div className='container-reviews-review-text'>
                    <img src={braces}/>
                    <p>Я проходила курс «Актёрское мастерство для детей». Этот курс был самым
                        интересным. Дети учились играть в разные игры, придумывали свои истории
                        и показывали их друг другу. Они учились работать в команде и помогать
                        друг другу. Я была поражена, насколько талантливы дети!</p>
                </div>
                <div className='container-reviews-review-author'>
                    <img src={user}/>
                    <p>Eleanor Pena</p>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", width: "50%", alignSelf: "center", alignItems: "center", marginBottom: "10%"}}>
                <h2 style={{marginBottom: "10%"}}>Оставьте свой отзыв</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="last_name">Фамилия</label>
                        {formik.errors.last_name && formik.touched.last_name ?
                            <input className='registration-page-invalid-input' type="text" name="last_name"
                                   value={formik.values.last_name} onChange={formik.handleChange}>
                            </input> :
                            <input className='registration-page-input' type="text" name="last_name"
                                   value={formik.values.last_name} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.last_name && formik.touched.last_name
                            ? formik.errors.last_name
                            : null}</p>
                    </div>
                    <div>
                        <label htmlFor="first_name">Имя</label>
                        {formik.errors.first_name && formik.touched.first_name ?
                            <input className='registration-page-invalid-input' type="text" name="first_name"
                                   value={formik.values.first_name} onChange={formik.handleChange}>
                            </input> :
                            <input className='registration-page-input' type="text" name="first_name"
                                   value={formik.values.first_name} onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.first_name && formik.touched.first_name
                            ? formik.errors.first_name
                            : null}</p>
                    </div>
                    <div>
                        <label htmlFor="review">Отзыв</label>
                        {formik.errors.review && formik.touched.review ?
                            <input className='registration-page-invalid-input' type="text" name="review"
                                   value={formik.values.review} onChange={formik.handleChange}>
                            </input> :
                            <input className='registration-page-input' type="text" name="review"
                                   value={formik.values.review}
                                   onChange={formik.handleChange}>
                            </input>

                        }

                        <p style={{color: '#dc3545'}}>{formik.errors.review && formik.touched.review
                            ? formik.errors.review
                            : null}</p>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <button type="submit" className='registration-page-button'>
                            Отправить
                        </button>
                    </div>
                    {message ? <p>{message}</p> : null}
                </form>
            </div>
        </div>
    )
};

export default ReviewsPage;