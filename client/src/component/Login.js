import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../action";
import InputField from "./Common/InputField";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: {}
  };

  componentDidMount() {
    let { auth } = this.props;
    if (auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: { ...this.state.error, [event.target.name]: "" }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(data, this.props.history);
  };

  render() {
    let { email, password, error } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  error={error.email}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  error={error.password}
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

export default (Login = connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login)));
