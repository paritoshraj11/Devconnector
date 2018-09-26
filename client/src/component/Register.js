import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../action";
import { withRouter } from "react-router-dom";
import InputField from "./Common/InputField";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    error: {}
  };

  componentDidMount = () => {
    let { auth } = this.props;
    if (auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
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
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(data, this.props.history);
  };

  render() {
    console.log(">>>> render call");
    let { name, email, password, password2, error } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <InputField
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  error={error.name}
                />

                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  error={error.email}
                  text=" This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />

                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  error={error.password}
                />

                <InputField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={this.onChange}
                  error={error.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

export default (Register = connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register)));
