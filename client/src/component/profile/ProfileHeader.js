import React, { Component } from 'react'

export default class ProfileHeader extends Component {
  render() {
   let {profile} = this.props;
   let {user,company,location} = profile   
   console.log(">>>>>>>> profile details",JSON.stringify(profile))
   console.log(">>>>profile.user",profile.user)
    return (
       <div className="container">
          <div className="row">
         <div className="col-md-12">
         <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{user.name}</h1>
              <p className="lead text-center">{`Developer at ${company}`}</p>
              <p>{location ?`Seattle, ${location}`:'' }</p>
              <p>
                <a className="text-white p-2" href="#">
                  <i className="fas fa-globe fa-2x"></i>
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a className="text-white p-2" href="#">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </p>
            </div>
          </div>
         </div>
        </div>
       </div>
    )
  }
}
