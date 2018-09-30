import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {deleteProfileCredentail} from "../../action"
class CredentialDetail extends Component {
  
  deleteExperience = (experienceId) =>{
    this.props.deleteProfileCredentail("experience",experienceId);
  }

  deleteEducation = (educationId) =>{
    this.props.deleteProfileCredentail("education",educationId);
  } 

  render() {
    let { profile } = this.props;
    if (!profile || !profile.profile) {
      return null;
    }
    profile = profile.profile;
    return (
      <div>
        <ExperienceList experience={profile.experience} deleteExperience={this.deleteExperience} />
        <EducationalList education={profile.education} deleteEducation = {this.deleteEducation} />
      </div>
    );
  }
}

const ExperienceList = ({ experience,deleteExperience }) => {
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
          <button class="btn btn-danger" onClick = {()=>deleteExperience(experience._id)}>Delete</button>
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

const EducationalList = ({ education,deleteEducation }) => {
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
          <button class="btn btn-danger" onClick={()=>deleteEducation(education._id)}>Delete</button>
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

export default connect(mapStateToProps,{deleteProfileCredentail})(CredentialDetail);
