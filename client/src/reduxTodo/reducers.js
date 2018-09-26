import { combineReducers, Reducer } from "redux";
import {
  ADD_TODO,
  TOGGLE_TODE,
  TOGGLE_VISIBILITY,
  VisibilityFilters
} from "./action";

const todos = (store = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...store,
        {
          item: action.item,
          completed: false
        }
      ];
    case TOGGLE_TODE:
      return store.map((item, index) => {
        if (index === action.index) {
          return Object.assign({}, item, {
            completed: !item.completed
          });
        }
        return item;
      });
    default:
      return store;
  }
};

const visibilityFilters = (store = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return (store = action.filter);
    default:
      return store;
  }
};

const reducers = combineReducers({
  visibilityFilters,
  todos
});

export default reducers;
