import axiosApi from "../../axiosApi";

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});
export const addCommentSuccess = () => ({type: ADD_COMMENT_SUCCESS});

export const fetchComments = postId => {
    return async (dispatch) => {
        const response = await axiosApi.get('/comments?post=' + postId);
        dispatch(fetchCommentsSuccess(response.data));
    };
};

export const addComment = commentData => {
    return async (dispatch, getState) => {
        const postId = getState().posts.post._id;
        const user = getState().users.user;
        await axiosApi.post('/comments?post=' + postId, commentData, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(addCommentSuccess());
    };
};