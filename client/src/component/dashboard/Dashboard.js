import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../action";
import ProfileAction from "./ProfileAction";
import CredentialDetail   from "./CredentialDetail"

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDelete = ()=>{

  }

  render() {
    let {
      profile,
      auth: { user }
    } = this.props;
    profile = profile.profile || {};
    let dashboardComponent = void 0;
    if (profile === null || profile.loading) {
      dashboardComponent = <h4> Loading .....</h4>;
    } else if (Object.keys(profile).length > 0) {
      // component to show profile of user
      dashboardComponent = (
        <div>
          <p calassName="lead text-muted">
            Welcome &nbsp;
            <Link to={`profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileAction />
          <CredentialDetail/>
          {/* Todo */}
          <div style={{marginBottom:60}}/>
          <button onClick={this.handleDelete} className="btn btn-danger"> DELETE ACCOUNT</button>
        </div>
      );
    } else {
      // user have not  profile
      dashboardComponent = (
        <div>
          <p calassName="lead text-muted">Welcome {user.name}</p>
          <p>You have not setup profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="containere">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    profile: store.profile,
    auth: store.auth
  };
};

export default (Dashboard = connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard));
