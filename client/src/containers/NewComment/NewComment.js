import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import CommentForm from "../../components/CommentForm/CommentForm";
import {addComment} from "../../store/actions/commentsActions";

class NewComment extends Component {
    addComment = commentData => {
        this.props.addComment(commentData);
    };

    render() {
        return (
            <Fragment>
                <h2>New comment</h2>
                <CommentForm
                    onSubmit={this.addComment}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addComment: commentData => dispatch(addComment(commentData))
});

export default connect(null, mapDispatchToProps)(NewComment);