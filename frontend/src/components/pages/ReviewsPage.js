import './reviewsPage.css';

import braces from '../../img/braces.svg';
import user from '../../img/user.jfif';
const ReviewsPage = () => {
    return (
        <div className='container-reviews-page'>
            <h1 style={{marginTop: "5%"}}>Наши отзывы</h1>
            <div className='container-reviews-review' style={{marginTop: "10%"}}>
                <div className='container-reviews-review-text'>
                    <img src={braces}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo,
                        amet lectus quam viverra mus lobortis fermentum amet, eu. Pulvinar
                        eu sed purus facilisi. Vitae id turpis tempus ornare turpis quis non.
                        Congue tortor in euismod vulputate etiam eros. Pulvinar neque pharetra
                        arcu diam maecenas diam integer in.</p>
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
            <div className='container-reviews-review'>
                <div className='container-reviews-review-text'>
                    <img src={braces}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo,
                        amet lectus quam viverra mus lobortis fermentum amet, eu. Pulvinar
                        eu sed purus facilisi. Vitae id turpis tempus ornare turpis quis non.
                        Congue tortor in euismod vulputate etiam eros. Pulvinar neque pharetra
                        arcu diam maecenas diam integer in.</p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo,
                        amet lectus quam viverra mus lobortis fermentum amet, eu. Pulvinar
                        eu sed purus facilisi. Vitae id turpis tempus ornare turpis quis non.
                        Congue tortor in euismod vulputate etiam eros. Pulvinar neque pharetra
                        arcu diam maecenas diam integer in.</p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo,
                        amet lectus quam viverra mus lobortis fermentum amet, eu. Pulvinar
                        eu sed purus facilisi. Vitae id turpis tempus ornare turpis quis non.
                        Congue tortor in euismod vulputate etiam eros. Pulvinar neque pharetra
                        arcu diam maecenas diam integer in.</p>
                </div>
                <div className='container-reviews-review-author'>
                    <img src={user}/>
                    <p>Eleanor Pena</p>
                </div>
            </div>
        </div>
    )
};

export default ReviewsPage;