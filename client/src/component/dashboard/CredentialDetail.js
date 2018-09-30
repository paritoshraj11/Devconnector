import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class CredentialDetail extends Component {
  render() {
    let { profile } = this.props;
    if (!profile || !profile.profile) {
      return null;
    }
    profile = profile.profile;
    return (
      <div>
        <ExperienceList experience={profile.experience} />
        <EducationalList education={profile.education} />
      </div>
    );
  }
}

const ExperienceList = ({ experience }) => {
  if (!experience || !experience.length) {
    return null;
  }
  let experienceRow = experience.map(experience => {
    return (
      <tr>
        <td>{experience.company}</td>
        <td>{experience.title}</td>
        <td>{`${moment(experience.from).format("MMM Do YY")}-${experience.to ? moment(experience.to).format("MMM Do YY") : "now"}` }</td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h4 class="mb-2">Experience Credentials</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
         {experienceRow}
        </tbody>
      </table>
    </div>
  );
};

const EducationalList = ({ education }) => {
  if (!education || !education.length) {
    return null;
  }
  let educationalRow = education.map(education => {
    return (
      <tr>
        <td>{education.school}</td>
        <td>{education.degree}</td>
        <td>{`${moment(education.from).format("MMM Do YY")}-${education.to ? moment(education.to).format("MMM Do YY") : "now"}` }</td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <div>
    <h4 class="mb-2">Education Credentials</h4>
    <table class="table">
      <thead>
        <tr>
          <th>School</th>
          <th>Degree</th>
          <th>Years</th>
          <th />
        </tr>
      </thead>
      <tbody>
       {educationalRow}
      </tbody>
    </table>
  </div>
  );
};

const mapStateToProps = store => {
  return {
    profile: store.profile
  };
};

export default connect(mapStateToProps)(CredentialDetail);
