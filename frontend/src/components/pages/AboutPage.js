import './aboutUsPage.css';

import illustration from '../../img/aboutUs1.jpg';
import notebook from '../../img/aboutUs2.jpg';
import structure from '../../img/structure.svg';
import chat from '../../img/chat.svg';
import target from '../../img/target.svg';

const AboutPage = () => {
    return (
        <div className='container-about-us-page'>
            <div className='container-about-us-slide-1'>
                <div className='container-about-us-slide-1-text-container'>
                    <h3 style={{color: '#1E212C', fontWeight: "normal"}}>О нас</h3>
                    <h1 style={{marginBottom: "5%"}}>Онлайн-школа Glow</h1>
                    <p style={{fontWeight: 'bold', lineHeight: "1.5"}}>Онлайн-школа Glow - лидер в области онлайн-обучения.
                        У нас есть множество курсов и программ от ведущих экспертов рынка.</p>
                    <p style={{lineHeight: "1.5"}}>Мы предлагаем актуальные подходы к онлайн-обучению и гарантируем ваше трудоустройство.
                        Наши образовательные программы помогут вам получить новую специальность с нуля.
                        Ознакомьтесь с курсами, которые мы организуем.</p>
                </div>
                <div className='container-about-us-slide-1-image-container'>
                    <img src={illustration} className='container-about-us-slide-1-image'/>
                </div>
            </div>
            <div className='container-about-us-slide-2'>
                <div className='container-about-us-slide-2-image-container'>
                    <img src={notebook} className='container-about-us-slide-2-image'/>
                </div>
                <div className='container-about-us-slide-2-text-container'>
                    <div className='container-about-us-slide-2-label-container'>
                        <h1>1200</h1>
                        <p>студентов получили сертификат</p>
                    </div>
                    <div className='container-about-us-slide-2-label-container'>
                        <h1>5</h1>
                        <p>лет опыта</p>
                    </div>
                    <div className='container-about-us-slide-2-label-container'>
                        <h1>10</h1>
                        <p>доступных курсов</p>
                    </div>
                    <div className='container-about-us-slide-2-label-container'>
                        <h1>10</h1>
                        <p>преподавателей</p>
                    </div>
                </div>
            </div>
            <div className='container-about-us-slide-3'>
                    <h3 style={{fontWeight: "normal"}}>Мы всегда за</h3>
                    <h1>Наши главные ценности</h1>
                <div className='container-about-us-slide-3-values-container'>
                    <div className='container-about-us-slide-3-value-container'>
                        <img src={structure} className='container-about-us-slide-3-image'/>
                        <h3>Структурированный подоход</h3>
                    </div>
                    <div className='container-about-us-slide-3-value-container'>
                        <img src={chat} className='container-about-us-slide-3-image'/>
                        <h3>Отзывы профессионалов</h3>
                    </div>
                    <div className='container-about-us-slide-3-value-container'>
                        <img src={target} className='container-about-us-slide-3-image'/>
                        <h3>Эффективность</h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AboutPage;