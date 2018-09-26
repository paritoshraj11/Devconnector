import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducres from "./reducers";
import AddTodo from "./component/AddTodo";
import ToDoList from "./component/ToDoList";
import TodoFilter from "./component/TodoFilter";

const store = createStore(
  reducres,
);

//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()



export default class ToDoApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <AddTodo />
          <ToDoList />
          <TodoFilter />
        </div>
      </Provider>
    );
  }
}
