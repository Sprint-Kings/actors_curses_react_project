import { useHttp } from "../hooks/http.hook";

const useCourseService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'http://localhost:8083/api/';

    const getAllCourses = async () => {
        const res = await request(`${_apiBase}courses`);
        return res
    }

    const getCourse = async (id) => {
        const res = await request(`${_apiBase}courses/${id}`);
        return res
    }

    return {loading, error, getCourse, getAllCourses,
        clearError}
}

export default useCourseService;