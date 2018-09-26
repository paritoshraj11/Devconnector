import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../action";

//stateless component
class AddTodo extends Component {
  state = {
    todo: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let { todo } = this.state;
    if (!todo.trim().length) {
      alert("Add Todo");
      return;
    }
    this.props.dispatch(addTodo(todo));
    this.setState({ todo: "" });
  };
  render() {
    return (
      <form action="submit" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            type="text"
            autocomplete="off"
            name="todo"
            value={this.state.todo}
            onChange={this.onChange}
          />
          <input type="submit" value="ADD TODO" />
        </div>
      </form>
    );
  }
}

AddTodo = connect()(AddTodo);
export default AddTodo;
