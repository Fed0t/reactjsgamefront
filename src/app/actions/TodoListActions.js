import axiosInstance from '../utils/axiosInstance';

export function fetchList() {
    return dispatch => {
        return axiosInstance.get(API_URL + '/todos');
    }
}
