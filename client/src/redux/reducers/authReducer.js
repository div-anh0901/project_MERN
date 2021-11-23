import ACTIONS from "../actions";

const initalState = {
  user: [],
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
