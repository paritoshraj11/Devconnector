import React from "react";
import {Link} from "react-router-dom";
import {isEmpty} from "../../util/utility"

const ProfileItems = ({ profiles }) => {
  if (!profiles || !profiles.length) {
    return null;
  }
  return profiles.map((profile)=>{
      return <div className="container">
          <div class="card card-body bg-light mb-3">
      <div class="row">
        <div class="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>{isEmpty(profile.status)?null:`Developer at ${profile.company}`}</p>
          <p>{isEmpty(profile.location)? null:`Seattle, ${profile.location}`}</p>
          <Link to={`/profile/${profile.handle}`} class="btn btn-info">View Profile</Link>
        </div>
        <div class="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          <ul class="list-group">
         {profile.skills.map((skill)=>{
             return  <li class="list-group-item">
             <i class="fa fa-check pr-1"></i>{skill}</li>
         })}
          </ul>
        </div>
      </div>
    </div>
      </div>
  })
};

export default ProfileItems;
