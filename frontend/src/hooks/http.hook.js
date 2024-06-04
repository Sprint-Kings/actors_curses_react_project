import { useState, useCallback } from "react";
import EventBus from "../services/EventBus";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, header=null, method='GET', body=null, typeD="json") => {

        setLoading(true);

        try {
            let options = {}
            if (body && header) {
                if (typeD === 'json') {
                    options = {
                        method: method,
                        headers: header,
                        body: JSON.stringify(body)
                    }
                } else {
                    options = {
                        method: method,
                        headers: header,
                        body: body
                    }
                }
                console.log(options)
            } else if (body) {
                if (typeD === 'json') {
                    options = {
                        method: method,
                        body: JSON.stringify(body)
                    }
                } else {
                    options = {
                        method: method,
                        body: body
                    }
                }
            } else if (header) {
                options = {
                    method: method,
                    headers: header
                }
            } else {
                options = {
                    method: method
                }
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                const data = await response.json();
                console.log(data.message)
                setError(data.message)
                setLoading(false)

                if (data.message === "No token provided!" || data.message === 'Refresh token was expired. Please make a new signin request') {
                    EventBus.dispatch("logout");
                    return []
                }
                if (data.message === 'Необходимо купить курс!') {
                    return []
                }

                if (data.message === 'Необходима роль преподавателя!') {
                    return []
                }

                if (data.message === 'Необходима роль администратора') {
                    return []
                }

                if (data.message === 'Курс не найден') {
                    return []
                }
                if (data.message === 'Unauthorized! Access Token was expired!') {
                    return []
                }

                // if (data.message === 'Пользователь с такой почтой уже существует') {
                //     return []
                // }
                throw new Error(data.message)
            }

            const data = await response.json();
            console.log(data)
            setLoading(false);
            return data;
        } catch(e) {
            console.log(e.message)
            setLoading(false);
            setError(e.message);
            if (e.message === 'Failed to fetch') {
                return []
            }
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])


    return {loading, request, error , clearError}
}

