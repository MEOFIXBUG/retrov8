import postData from './postData';
import authHeader from './auth-header';
const API_URL = "https://retrov8.herokuapp.com/api/users/";

class AuthService {

    login(username, password) {
        return postData(API_URL + "login", {
            "Username": username,
            "Password": password
        }, { 'Content-Type': 'application/json' })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("token");
    }

    async register(name, email, password) {
        return await postData(API_URL + "register",
            {
                'Username': name,
                'Email': email,
                'Password': password
            },
            { 'Content-Type': 'application/json' }
        );
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('token'));;
    }

    async auth() {
        return await fetch(API_URL + 'auth', { headers: authHeader() });
    }
}

export default new AuthService();
