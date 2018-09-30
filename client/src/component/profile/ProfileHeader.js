import React, { Component } from "react";

const urlLink = (link)=>{
  return link.includes("http") ? link : `http://${link}`
}

export default class ProfileHeader extends Component {
  render() {
    let { profile } = this.props;
    let { user, company, location, social, website } = profile;
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
                <p>{location ? `Seattle, ${location}` : ""}</p>
                <p>
                  {website && (
                    <a
                      target="_blank"
                      className="text-white p-2"
                      href={urlLink(website)}
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                  )}

                  {social.twitter && (
                    <a
                      target="_blank"
                      className="text-white p-2"
                      href={urlLink(social.twitter)}
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}
                  {social.facebook && (
                    <a
                      target="_blank"
                      className="text-white p-2"
                      href={urlLink(social.facebook)}
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      target="_blank"
                      className="text-white p-2"
                      href={urlLink(social.linkedin)}
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}
                  {social.youtube && (
                    <a
                      target="_blank"
                      className="text-white p-2"
                      href={urlLink(social.youtube)}
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
