import { GET_FILES, UPLOAD_FILE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FILES:
      const reducedPayload = action.payload.reduce((obj, item) => {
        obj[item.filename] = item;
        return obj;
      }, {});
      return { ...state, ...reducedPayload };
    case UPLOAD_FILE:
    default:
      return state;
  }
};
