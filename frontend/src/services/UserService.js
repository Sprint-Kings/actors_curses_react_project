import axios from "axios";
import { useHttp } from "../hooks/http.hook";
import authHeader from "./AuthHeader";


const useUserService = () => {


    const API_URL = "http://localhost:8083/api/";

    const {loading, request, error, clearError} = useHttp();

    const getUserBoard = async () => {
        const res = await request(`${API_URL}user`, authHeader());
        return res;
    }

    const buyCourse = async (courseId) => {
        const res = await request(`${API_URL}user/user/${courseId}/buy`, authHeader(), 'POST');
        return res.message;
    };

    const addAnswer = async (taskId, file) => {
        const myData = new FormData();
        myData.append("video", file)
        const res = await request(`${API_URL}user/answer/${taskId}/submit`, authHeader(), 'POST', {
            video: myData
        });
        return res.message;
    };


    const getTask = async (taskId) => {
        const res = await request(`${API_URL}user/task/${taskId}`, authHeader());
        return res;
    }

    const getLektion = async (lektionId) => {
        const res = await request(`${API_URL}user/lektion/${lektionId}`, authHeader());
        return res;
    }

    const getAllTaskAndLektion = async () => {
        const res = await request(`${API_URL}user/tasks/all`, authHeader());
        return res;
    }

    const refreshToken = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await request(`${API_URL}auth/refreshtoken`, authHeader(), 'POST', {
            refreshToken: user.refreshToken
        });
        localStorage.setItem("user", JSON.stringify(res));
        return res.data;
    };

    const getUsersAdmin = async () => {
        const res = await request(`${API_URL}admin/users`, authHeader());
        return res;
    }

    const addUserAdmin = async (username, email, first_name, last_name, password, accepted_oferta) => {
        const res = await request(`${API_URL}admin/users/submit`, authHeader(), 'POST', {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password,
            accepted_oferta: accepted_oferta
        });

        return res.message;
    };

    const deleteUser = async (userId) => {
        const res = await request(`${API_URL}admin/users/delete`, authHeader(), 'POST', {
            userId: userId,
        });
        return res.message;
    };

    const getCoursesAdmin = async () => {
        const res = await request(`${API_URL}admin/courses`, authHeader());
        return res;
    }

    const addCourseAdmin = async (username, teacher, description, duration, price, teacherId, preview) => {
        const res = await request(`${API_URL}admin/courses/submit`, authHeader(), 'POST', {
            name: username,
            teacher: teacher,
            description: description,
            duration: duration,
            price: price,
            teacherId: teacherId,
            preview: preview
        });

        return res.message;
    };

    const deleteCourse = async (userId) => {
        const res = await request(`${API_URL}admin/courses/delete`, authHeader(), 'POST', {
            userId: userId,
        });
        return res.message;
    };

    const addTaskTeacher = async (name, description, opened, courseId, min_ball) => {
        const res = await request(`${API_URL}teacher/task/add`, authHeader(), 'POST', {
            name: name,
            description: description,
            opened: opened,
            courseId: courseId,
            min_ball: min_ball
        });

        return res.message;
    };

    const deleteTaskTeacher = async (taskId) => {
        const res = await request(`${API_URL}teacher/task/delete`, authHeader(), 'POST', {
            taskId: taskId
        });
        return res.message;
    };

    const addLektionTeacher = async (name, video, opened, courseId) => {
        const res = await request(`${API_URL}teacher/lektion/add`, authHeader(), 'POST', {
            name: name,
            video: video,
            opened: opened,
            courseId: courseId
        });

        return res.message;
    };

    const deleteLektionTeacher = async (taskId) => {
        const res = await request(`${API_URL}teacher/lektion/delete`, authHeader(), 'POST', {
            lektionId: lektionId
        });
        return res.message;
    };

    const getAnswersTeacher = async (taskId) => {
        const res = await request(`${API_URL}teacher/${taskId}/answers`, authHeader());
        return res;
    }

    const addBallTeacher = async (answerId, ball) => {
        const res = await request(`${API_URL}teacher/answer/${answerId}/add`, authHeader(), 'POST', {
            ball: ball
        });

        return res.message;
    };

    const getAllTaskAndLektionForTeacher = async () => {
        const res = await request(`${API_URL}teacher/task/all`, authHeader());
        return res;
    }

    const download = async (filepath) => {
        const res = await request(`${API_URL}download`, authHeader());
        return res;
    };

    return {
        loading, request, error,
        clearError, refreshToken,
        buyCourse, addAnswer, getTask, getUserBoard, getLektion, getAllTaskAndLektion, getUsersAdmin, addUserAdmin,
        deleteUser, getCoursesAdmin, addCourseAdmin, deleteCourse, addTaskTeacher, deleteTaskTeacher,
        addLektionTeacher, deleteLektionTeacher, getAnswersTeacher, addBallTeacher, getAllTaskAndLektionForTeacher,
        download};
}
export default useUserService;