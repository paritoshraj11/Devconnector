import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../action";
import TextAreaField from "../Common/TextAreaField";
import FileInputField from "../Common/FileInputField";

class PostForm extends Component {
  state = {
    text: "",
    error: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: { ...this.state.error, [event.target.name]: "" }
    });

    // Todo  how to remove error message
  };

  onSubmit = e => {
    e.preventDefault();
    let { text } = this.state;
    let { onSubmitForm } = this.props;
    let { name, avatar } = this.props.auth.user;
    let newPost = {
      name,
      avatar,
      text
        };

    if (onSubmitForm) {
      onSubmitForm && onSubmitForm(newPost);
      this.setState({ text: "" });
    }
  };
  render() {
    let { error, text } = this.state;
    let { placeholder } = this.props;
    return (
      <div class="post-form mb-3">
        <div class="card card-info">
          <div class="card-header bg-info text-white">Say Somthing...</div>
          <div class="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaField
                name="text"
                value={text}
                error={error.text}
                placeholder={placeholder || "Write Something"}
                onChange={this.onChange}
              />
              <button type="submit" class="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    auth: store.auth,
    errors: store.errors
  };
};

export default (PostForm = connect(
  mapStateToProps,
)(PostForm));
