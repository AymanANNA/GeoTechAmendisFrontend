import { jwtDecode } from 'jwt-decode';

const AuthService = {
    isAuthenticated: () => {
        const token = localStorage.getItem("access_token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp > currentTime;
        }

        return false;
    },

    login: (username, password) => {
        const bodyData = {
            username: username,
            password: password,
            client_type: 'Web'
        };

        return fetch("http://127.0.0.1:8001/api/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(`HTTP error! Status: ${response.status}, ${errData.detail}`);
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
        });
    },

    logout: (callback) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        callback();
    },

    resetPassword: (username, email) => {
        const bodyData = {
            username: username,
            email: email
        };

        return fetch("http://127.0.0.1:8001/api/reset-password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(`HTTP error! Status: ${response.status}, ${errData.detail}`);
                });
            }
            return response.json();
        })
        .then(data => {
            return data.message;  // Assuming the backend sends a message upon successful reset
        });
    }
};

export default AuthService;
