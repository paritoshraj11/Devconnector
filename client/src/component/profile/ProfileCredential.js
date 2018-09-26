import React, { Component } from 'react';
import moment from "moment";

export default class ProfileCredential extends Component {
  render() {
    let {profile:{experience,education}} = this.props;
    return <div className="container">
      <div className="row">
    <div className="col-md-6">
      <h3 className="text-center text-info">Experience</h3>
      <ul className="list-group">
        {
          experience.map((experience)=>{
            return <li className="list-group-item">
            <h4>{experience.company}</h4>
            <p>{`${moment(experience).format("MMM YYYY")} - ${experience.current?'Current':moment(experience.to).format("MMM YYYY")}`}</p>
            <p>
              <strong>Position:</strong> {experience.title}
            </p>
            <p>
              <strong>Location: </strong> {experience.location}
            </p>
            <p>
              <strong>Description:</strong> {experience.description}</p>
          </li>

          })
        }
      </ul>
    </div>
    <div className="col-md-6">
      <h3 className="text-center text-info">Education</h3>
      <ul className="list-group">
      {education.map((education)=>{
        return <li className="list-group-item">
        <h4>{education.school}</h4>
        <p>{`${moment(experience).format("MMM YYYY")} - ${experience.current?'Current':moment(experience.to).format("MMM YYYY")}`}</p>
        <p>
          <strong>Degree: </strong>{education.degree}</p>
        <p>
          <strong>Field Of Study: </strong>{education.field}</p>
        <p>
          <p>
            <strong>Description:</strong>{education.description} </p>
         </p>   
      </li>
      })}
      </ul>
    </div>
  </div>
    </div>
  }

}
