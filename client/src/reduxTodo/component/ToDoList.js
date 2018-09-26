import React from "react";
import { connect } from "react-redux";
import { VisibilityFilters, toggleTodo } from "../action";
let { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } = VisibilityFilters;

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li>
            <div style={{ alignItems: "center" }}>
              {todo.item}
              <Checkbox
                key={JSON.stringify(todo)}
                isChecked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

class Checkbox extends React.Component {
  onChange = e => {
    this.props.onChange && this.props.onChange();
  };
  render() {
    return (
      <input
        type="checkbox"
        defaultChecked={this.props.isChecked}
        style={{ marginLeft: 5, marginTop: 3 }}
        onChange={this.onChange}
      />
    );
  }
}

const visibleTodos = (todos, visibilityFilters) => {
  switch (visibilityFilters) {
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case SHOW_ALL:
    default:
      return todos;
  }
};

const mapStateToProps = store => {
  return {
    todos: visibleTodos(store.todos, store.visibilityFilters)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: index => dispatch(toggleTodo(index))
  };
};

const TODOS = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
export default TODOS;
