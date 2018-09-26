import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import CheckBoxField from "../Common/CheckBoxField";
import DateField from "../Common/DateField";
import {addExperience} from "../../action"

class AddExperience extends Component {
  state = {
    title: "",
    location: "",
    description: "",
    company: "",
    current: false,
    from:'',
    to:'',
    error: {}
  };


  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({error:nextProps.errors})
      }
  }

  handleSubmit = e => {
    e.preventDefault();
    let {error,...restExperienceState} = this.state;
    this.props.addExperience(restExperienceState,this.props.history)
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: { ...this.state.error, [event.target.name]: "" }
    });

    // Todo  how to remove error message
  };

  onCheck = () =>{
      this.setState({
          current:!this.state.current,
      })
  }

  render() {
    let { error, title, location, description, company, current,from ,to } = this.state;

    return (
      <div class="section add-experience">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <button onClick={()=>{
                  this.props.history.push('/profile');
              }} class="btn btn-light">
                Go Back
              </button>
              <h1 class="display-4 text-center">Add Your Experience</h1>
              <p class="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small class="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <InputField
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={error.title}
                />

                <InputField
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={error.company}
                />

                <InputField
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={error.location}
                />
                <h6>From Date</h6>
                <DateField name="from"  onChange={this.onChange} />
                <h6>To Date</h6>
                <DateField name="to" disabled = {current ? 'disabled':''}  onChange={this.onChange} />
                <CheckBoxField
                  id={"current"}
                  nmae="current"
                  label=" Current Job"
                  onChange={this.onCheck}
                  checked = {current}
                  value={current}
                />
                <TextAreaField
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={error.description}
                  text=" Some of your responsabilities, etc"
                />
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    errors:store.errors
  };
};
export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));
