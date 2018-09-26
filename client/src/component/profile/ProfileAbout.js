import React, { Component } from 'react'

export default class ProfileAbout extends Component {
  render() {
    let {profile} = this.props;
    let {skills,bio,user} = profile
    return (
        <div className="container">
          <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-light mb-3">
            <h3 class="text-center text-info">{`${user.name}'s bio`}</h3>
            <p class="lead">{bio}</p>
            <hr />
            <h3 class="text-center text-info">Skill Set</h3>
            <div class="row">
              <div class="d-flex flex-wrap justify-content-center align-items-center">
                {skills.map((skill)=>{
                  return <div class="p-3">
                   <i class="fa fa-check"></i> {skill}</div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
