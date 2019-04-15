import { PREDICTIONS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case PREDICTIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
