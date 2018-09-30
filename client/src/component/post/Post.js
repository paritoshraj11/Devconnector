import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, addComment,deleteComment } from "../../action";
import PostForm from "./PostForm";

class Post extends Component {
  componentDidMount() {
    const { getPost, match } = this.props;
    getPost({ _id: match.params._id });
  }

  onSubmitForm = data => {
    this.props.addComment({ ...data, postId: this.props.posts.post._id });
  };

  render() {
    let {
      posts,
      auth: { user }
    } = this.props;
    let post = posts.post;
    let postComponent = void 0;

    if (post === null || posts.loading) {
      postComponent = <h3>Loading ......</h3>;
    } else {
      postComponent = (
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-2">
              <a href="profile.html">
                <img
                  class="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt=""
                />
              </a>
              <br />
              <p class="text-center">{post.name}</p>
            </div>
            <div class="col-md-10">
              <p class="lead">{post.text}</p>
            </div>
          </div>
        </div>
      );
    }

    let commentsComponent = void 0;
    if (post && post.comments) {
      commentsComponent = post.comments.map(comment => {
        return (
          <div class="card card-body mb-3">
            <div class="row">
              <div class="col-md-2">
                <a href="profile.html">
                  <img
                    class="rounded-circle d-none d-md-block"
                    src={comment.avatar}
                    alt=""
                  />
                </a>
                <br />
                <p class="text-center">{comment.name}</p>
              </div>
              <div class="col-md-10">
                <p class="lead">{comment.text}</p>
                {user._id === comment.user ? (
                  <button type="button" onClick={()=>this.props.deleteComment({_id:comment._id})} class="btn btn-danger mr-1">
                    <i class="fas fa-times" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div class="post">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              {postComponent}
              <PostForm
                onSubmitForm={this.onSubmitForm}
                placeholder="Create a Comment"
              />
              {commentsComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    auth: store.auth,
    posts: store.posts
  };
};

export default connect(
  mapStateToProps,
  { getPost, addComment,deleteComment }
)(Post);
