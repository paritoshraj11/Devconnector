
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logOutUser,clearCurrentProfile} from "../action"

class NavBar extends Component {

  onClick = (e) =>{
    e.preventDefault();
   this.props.logOutUser();
   this.props.clearCurrentProfile();
  }

  render() {
    let userLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a  onClick={this.onClick} className="nav-link" href="">
            Sign Out
          </a>
        </li>
      </ul>
    );
  
    let guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    
    let {auth} = this.props;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
          </div>
           
           {auth.isAuthenticated ? userLink : guestLink }

        </div>
      </nav>
    );
  }
}

const mapStateToProps = (store) =>{
  return {
    auth:store.auth
  }
}

export default NavBar = connect(mapStateToProps,{logOutUser,clearCurrentProfile})(NavBar);
