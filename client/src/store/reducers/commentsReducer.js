import {FETCH_COMMENTS_SUCCESS} from "../actions/commentsActions";

const initialState = {
    comments: [],
    
};

const commentsReducer = (state = initialState, action) => {
    if (action.type === FETCH_COMMENTS_SUCCESS) {
        return {...state, comments: action.comments}
    }

    return state;
};

export default commentsReducer;