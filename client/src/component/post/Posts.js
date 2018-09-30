import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPosts,addPost } from "../../action";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed"

class Posts extends Component {

  componentDidMount(){
    this.props.getAllPosts();
  }

  onSubmitForm = (data)=>{
    this.props.addPost(data);
  }
 
  render() {
    let {posts} = this.props;
    posts = posts.posts;  
    let postFeedComponent = void 0;
    if(posts === null || posts.loading){
      postFeedComponent = (
        <div>Loading......</div>
      )
    }else{
      postFeedComponent = <PostFeed posts={posts} />
    }
    
    return (
      <div>
        <div class="feed">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
              <PostForm onSubmitForm = {this.onSubmitForm} placeholder="Create a Post" />
                {postFeedComponent}
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    posts:store.posts
  };
};

export default (Posts = connect(
  mapStateToProps,
  { getAllPosts,addPost }
)(Posts));
