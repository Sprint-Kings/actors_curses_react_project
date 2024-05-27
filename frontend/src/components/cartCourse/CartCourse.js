import why from "../../img/why.jpg";
import "./cartCourse.css"
import {Link} from "react-router-dom";

const CartCourse = ({course}) => {
    return (
        <Link className='container-cart' to={`/${course.id}`}>

                <img src={why} className='container-image'/>
                <div className='container-text'>
                    <h2>{course.name}</h2>
                    <h4>Цена: <span style={{color: "#FF4242"}}>{course.price}</span> ₽ | Длительность: {course.duration} дней</h4>
                </div>

        </Link>
    )
}

export default CartCourse;