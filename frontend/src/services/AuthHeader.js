export default function authHeader(type = 'json') {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        if (type === 'file') {
            console.log("hier")
            return {'x-access-token': user.accessToken };
        } else {
            return { "Content-Type": "application/json", 'x-access-token': user.accessToken };
        }

    } else {
        return {};
    }
}