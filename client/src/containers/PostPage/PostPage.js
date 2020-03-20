import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchComments} from "../../store/actions/commentsActions";
import {fetchPost} from "../../store/actions/postsActions";
import PostThumbnail from "../../components/PostThumbnail/PostThumbnail";
import NewComment from "../NewComment/NewComment";

class PostPage extends Component {
    componentDidMount() {
        this.props.fetchComments(this.props.match.params.id);
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        const { post, comments } = this.props;
        const renderPost = post => (
            <div>
                <PostThumbnail image={post.image}/>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <div>
                    {new Date(post.date).toDateString()}
                    by <strong>{post.user.username}</strong>
                </div>
            </div>
        );
        const renderComments = comments => comments.map(comment => (
            <div>{comment.user.username} wrote: {comment.text}</div>
        ));


        return (
            <div>
                { post && renderPost(post) }
                <h3 style={{marginTop: '50px'}}>Comments</h3>
                { comments && renderComments(comments) }
                { this.props.user && < NewComment /> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    post: state.posts.post,
    comments: state.posts.comments,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    fetchPost: (postId) => dispatch(fetchPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);