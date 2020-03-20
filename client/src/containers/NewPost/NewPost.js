import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {addPost} from "../../store/actions/postsActions";
import PostForm from "../../components/PostForm/PostForm";

class NewPost extends Component {
    addPost = async (postData) => {
        await this.props.addPost(postData);
        this.props.history.push('/');
    };

    render() {
        return (
            <Fragment>
                <h2>New post</h2>
                <PostForm
                    onSubmit={this.addPost}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addPost: postData => dispatch(addPost(postData)),
});

export default connect(null, mapDispatchToProps)(NewPost);