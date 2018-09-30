import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";
import TextAreaField from "../Common/TextAreaField";
import classNames from "classnames";
import { addUserProfile } from "../../action";

let professionOption = [
  { value: 0, key: "* Select Professional Status" },
  { value: "Developer", key: "Developer" },
  { value: "Junior Developer", key: "Junior Developer" },
  { value: "Senior Developer", key: "Senior Developer" },
  { value: "Manager", key: "Manager" },
  { value: "Student or Learning", key: "Student or Learning" },
  { value: "Instructor", key: "Instructor or Teacher" },
  { value: "Intern", key: "Intern" },
  { value: "Other", key: "Other" }
];

class CreateProfile extends Component {
  state = {
    displaySocialInput: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    githubusername: "",
    bio: "",
    skills: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    error: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: { ...this.state.error, [event.target.name]: "" }
    });

    // Todo  how to remove error message
  };

  onSubmit = e => {
    e.preventDefault();
    let { displaySocialInput, error, ...restState } = this.state;
    this.props.addUserProfile(restState, this.props.history);
  };

  toggleSocailInput = () => {
    this.setState({ displaySocialInput: !this.state.displaySocialInput });
  };

  render() {
    let {
      displaySocialInput,
      handle,
      location,
      company,
      website,
      bio,
      skills,
      status,
      githubusername,
      twitter,
      facebook,
      youtube,
      linkedin,
      error
    } = this.state;

    const socialInputComponent = (
      <div>
        <InputGropup
          classIcon="fa fa-twitter"
          value={error.twitter}
          name="twitter"
          value={twitter}
          error={error.twitter}
          placeholder="Twitter Profile URL"
          onChange={this.onChange}
        />
        <InputGropup
          classIcon="fa fa-facebook-official"
          value={error.facebook}
          name="facebook"
          value={facebook}
          error={error.facebook}
          placeholder="Facebook Profile URL"
          onChange={this.onChange}
        />
        <InputGropup
          classIcon="fa fa-linkedin"
          value={error.linkedin}
          name="linkedin"
          value={linkedin}
          error={error.linkedin}
          placeholder="Linkedin Profile URL"
          onChange={this.onChange}
        />
        <InputGropup
          classIcon="fa fa-youtube"
          value={error.youtube}
          name="youtube"
          value={youtube}
          error={error.youtube}
          placeholder="Youtube Profile URL"
          onChange={this.onChange}
        />
      </div>
    );

    return (
      <div class="create-profile">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Create Your Profile</h1>
              <p class="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small class="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <InputField
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  error={error.handle}
                  value={handle}
                  onChange={this.onChange}
                  text="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later"
                />

                <SelectField
                  name="status"
                  placeholder="status"
                  error={error.status}
                  value={status}
                  options={professionOption}
                  onChange={this.onChange}
                  text="Give us an idea of where you are at in your career"
                />
                <InputField
                  type="text"
                  placeholder="Company"
                  name="company"
                  error={error.company}
                  value={company}
                  onChange={this.onChange}
                  text="Could be your own company or one you work for"
                />
                <InputField
                  type="text"
                  placeholder="Website"
                  name="website"
                  error={error.website}
                  value={website}
                  onChange={this.onChange}
                  text="Could be your own or a company website"
                />
                <InputField
                  type="text"
                  placeholder="Location"
                  name="location"
                  error={error.location}
                  value={location}
                  onChange={this.onChange}
                  text="City & state suggested (eg. Boston, MA)"
                />
                <InputField
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  error={error.skills}
                  value={skills}
                  onChange={this.onChange}
                  text="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />

                <InputField
                  type="text"
                  placeholder="githubusername"
                  name="githubusername"
                  error={error.githubusername}
                  value={githubusername}
                  onChange={this.onChange}
                  text="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaField
                  error={error.bio}
                  value={bio}
                  placeholder="A short bio of yourself"
                  name="bio"
                  onChange={this.onChange}
                  text="Tell us a little about yourself"
                />

                <div class="mb-3">
                  <button
                    type="button"
                    onClick={this.toggleSocailInput}
                    class="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span class="text-muted">Optional</span>
                </div>

                {displaySocialInput && socialInputComponent}

                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const InputGropup = ({ error, classIcon, ...rest }) => {
  return (
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class={classIcon} />
        </span>
      </div>
      <input
        type="text"
        className={classNames("form-control form-control-lg", {
          "is-invalid": error
        })}
        {...rest}
      />
      {error && <dev className="invalid-feedback">{error}</dev>}
    </div>
  );
};

const mapStateToProps = store => {
  return {
    errors: store.errors,
    profile: store.profile
  };
};

export default connect(
  mapStateToProps,
  { addUserProfile }
)(withRouter(CreateProfile));
