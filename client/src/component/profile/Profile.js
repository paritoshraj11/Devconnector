import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileCredential from "./ProfileCredential";
import ProfileGitHub from "./ProfileGitHub";
import { getProfileByHandle } from "../../action";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    let { profile } = this.props;
    let profileComponent = void 0;
    if (profile.profile === null || profile.loading) {
      profileComponent = <h3>loading ...</h3>;
    } else {
      profileComponent = (
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                  Back To Profiles
                </Link>
              </div>
              <div className="col-6" />
              <ProfileHeader profile={profile.profile} />
              <ProfileAbout profile={profile.profile}/>
              <ProfileCredential profile={profile.profile}/>
              <ProfileGitHub profile={profile.profile}/>
            </div>
          </div>
        </div>
      );
    }
    return <div className="container" >
        {profileComponent}
        </div>;
  }
}

const mapStateToProps = store => {
  return {
    profile: store.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
