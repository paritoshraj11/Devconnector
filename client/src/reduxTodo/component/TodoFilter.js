import React from "react";
import { connect } from "react-redux";
import { VisibilityFilters, toogleVisibility } from "../action";

const TodoFilter = () => {
  return (
    <div>
      <FilterLink filter={VisibilityFilters.SHOW_ALL} text="SHOW ALL" />
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE} text="SHOW ACTIVE" />
      <FilterLink
        filter={VisibilityFilters.SHOW_COMPLETED}
        text="SHOW COMPLETED"
      />
    </div>
  );
};

const Link = ({ text, active, onClick }) => {
  return (
    <button
      style={{
        marginLeft: 10
      }}
      disabled={active}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilters
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(toogleVisibility(ownProps.filter))
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default TodoFilter;
