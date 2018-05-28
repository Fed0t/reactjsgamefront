import axios from 'axios';

var instance = axios.create({
    baseURL: API_URL
});

export function userSignupRequest(userData) {
    return dispatch => {
        return instance.post('/registerUser',userData);
    }
}

export function isUserExists(identifier) {
    return dispatch => {
        return instance.get('/checkUser/'+identifier);
    }
}
