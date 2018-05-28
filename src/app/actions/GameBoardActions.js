import instance from 'index';

export function createEvent(event){
    return dispatch => {
        return instance.get('/todos');
    }
}