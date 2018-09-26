import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InputField from "../Common/InputField";
import TextAreaField from "../Common/TextAreaField";
import CheckBoxField from "../Common/CheckBoxField";
import DateField from "../Common/DateField";
import {addEducation} from "../../action"

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    field: "",
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
    let {error,...restEducationState} = this.state;
    this.props.addEducation(restEducationState,this.props.history)
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
    let { error, school, degree, field,current,from ,to,description } = this.state;

    return (
      <div class="section add-experience">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <button onClick={()=>{
                  this.props.history.push('/dashboard');
              }} class="btn btn-light">
                Go Back
              </button>
              <h1 class="display-4 text-center">Add Your Education</h1>
              <p class="lead text-center">
              Add any school, bootcamp, etc that you have attended
              </p>
              <small class="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <InputField
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={error.school}
                />

                <InputField
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={error.degree}
                />

                <InputField
                  placeholder="Field Of Study"
                  name="field"
                  value={field}
                  onChange={this.onChange}
                  error={error.field}
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
                  placeholder="Program Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={error.description}
                  text=" Tell us about your experience and what you learned"
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
export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation));
