import axiosInstance from '../../utils/axiosInstance';
import {UPDATE_LAST_FIVE_DRAWS} from '../types';
import {SET_LAST_FIVE_DRAWS} from '../types';

export function setCurrentNumbers(lastFiveDraws) {
    return {
        type: UPDATE_LAST_FIVE_DRAWS,
        lastFiveDraws
    }
}


export function setLastFiveDraws(lastFiveDraws) {
    return {
        type: SET_LAST_FIVE_DRAWS,
        lastFiveDraws
    }
}


export function fetchLastFiveDraws() {
    return dispatch => {
        return axiosInstance.get('/getLastFiveDraws').then(res=>{
            const lastFiveDraws = res.data;
            dispatch(setLastFiveDraws(lastFiveDraws));
        });
    }
}

export function fetchAllDraws(next_link) {
    return dispatch => {
        return axiosInstance.get(next_link);
    }
}