import {UPDATE_LAST_FIVE_DRAWS} from '../actions/types';
import {SET_LAST_FIVE_DRAWS} from '../actions/types';

const initialState = {
    lastFiveDraws: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_LAST_FIVE_DRAWS:
            var lastFiveDraws = insertItem(state.lastFiveDraws,action);
            return{
                lastFiveDraws,
            };
        case SET_LAST_FIVE_DRAWS:
            return {
                lastFiveDraws: action.lastFiveDraws,
            };
        default:
            return state;
    }
}

function insertItem(array, action) {
    let newArray = array.slice();
    newArray.splice(action.index, 0, action.lastFiveDraws);
    newArray.splice(-1,1);//remove last object
    return newArray;
}
