import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchPosts} from "../../store/actions/postsActions";
import PostListItem from "../../components/PostListItem/PostListItem";

class Posts extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <>
                {this.props.posts.map(post => (
                    <PostListItem
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        image={post.image}
                        user={post.user}
                    />
                ))}

                <div ref={this.bottom}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
