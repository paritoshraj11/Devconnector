import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../action/index";
import ProfileItems from "./ProfileItems";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    let { profile } = this.props;
    let profiles = profile.profiles;
    let profileComponent = void 0;

    if (profiles === null || profile.loading === true) {
      profileComponent = <h4>Loading .......</h4>;
    } else if (profiles.length > 0) {
      profileComponent = <ProfileItems profiles={profiles} />;
    } else {
      profileComponent = <h3> not found any profile....</h3>;
    }

    return (
      <div class="profiles">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4 text-center">Developer Profiles</h1>
              <p class="lead text-center">Browse and connect with developers</p>
              {profileComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    profile: store.profile
  };
};

export default (Profiles = connect(
  mapStateToProps,
  { getProfiles }
)(Profiles));
