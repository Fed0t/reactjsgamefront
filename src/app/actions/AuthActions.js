import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {SET_CURRENT_USER} from './types';
import {browserHistory} from 'react-router';
import instance from '../utils/axiosInstance';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function login(data){
    return dispatch => {
        return instance.post('/loginUser',data).then(res => {
            if(res.data.api_token && res.data.currentUser){
                const token = res.data.api_token;
                const userData = res.data.currentUser;
                localStorage.setItem('apiToken',token);
                localStorage.setItem('userData',userData);
                setAuthorizationToken(token);
                dispatch(setCurrentUser( userData));
            }
        });
    }
}

export function logout(){
    return dispatch => {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('userData');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        axios.get('/logout').then( res =>{
            browserHistory.push('/');
        });
    }
}

export function recoverPasswordRequest(email){
    return dispatch => {
        return axios.post('/password/email', email)
    }
}