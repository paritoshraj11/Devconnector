import {SET_USER,REMOVE_USER} from "../actionConstant";
import {isEmpty} from "../util/utility";

const initialStor = {
  isAuthenticated: false,
  user: {}
};

const auth = (store = initialStor, action) => {
  switch (action.type) {
    case SET_USER : return {
      ...store,
      isAuthenticated:!isEmpty(action.user),
      user:action.user
    }
    case REMOVE_USER : return {
      ...store,
      ...initialStor
    }
    default:
      return store;
  }
};

export default auth;
