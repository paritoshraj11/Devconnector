//actions
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODE = "TOGGLE_TODO";
export const TOGGLE_VISIBILITY = "TOOGLE_VISISBIlity";

//visibility filter
export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

//actions creator

export const addTodo = text => {
  return {
    type: ADD_TODO,
    item: text
  };
};

export const toggleTodo = index => {
  return {
    type: TOGGLE_TODE,
    index
  };
};

export const toogleVisibility = filter => {
  return {
    type: TOGGLE_VISIBILITY,
    filter
  };
};
