import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {deletePost,likePost} from "../../action"
class PostFeed extends Component {
  render() {
    let { posts } = this.props;
    return posts.map((post, index) => {
      return <PostItemComponent post={post} />;
    });
  }
}

export default PostFeed;

const PostItem = ({ post, user,deletePost,likePost }) => {
  return (
    <div class="posts">
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-2">
              <img
                class="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            <br />
            <p class="text-center">{post.name}</p>
          </div>
          <div class="col-md-10">
            <p class="lead">{post.text}</p>
            <button type="button" onClick={()=>likePost({postId:post._id})} class="btn btn-light mr-1">
              <i class="text-info fas fa-thumbs-up" />
              <span class="badge badge-light">{post.likes.length}</span>
            </button>
            <Link to={`/post/${post._id}`} class="btn btn-info mr-1">
              Comments
            </Link>
            {user._id === post.user ? (
              <button type="button" onClick={()=>deletePost({_id:post._id})} class="btn btn-danger mr-1">
                <i class="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    user: store.auth.user
  };
};

const PostItemComponent = connect(mapStateToProps,{deletePost,likePost})(PostItem);
