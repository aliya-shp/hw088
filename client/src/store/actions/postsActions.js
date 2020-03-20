import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});
export const addPostSuccess = () => ({type: ADD_POST_SUCCESS});


export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await axiosApi.get('/posts');
        dispatch(fetchPostsSuccess(response.data));
    };
};

export const fetchPost = (postId) => {
    return async (dispatch) => {
        const response = await axiosApi.get('/posts/' + postId);
        dispatch(fetchPostSuccess(response.data));
    };
};

export const addPost = postData => {
    return async (dispatch, getState) => {
        const token = getState().auth.user.token;
        await axiosApi.post('/posts',postData, {headers : {Authorization : 'Token ' + token}});
        dispatch(addPostSuccess());
    };
};