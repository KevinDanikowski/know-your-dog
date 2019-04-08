import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducers from "./errorReducers";
import fileReducer from "./fileReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducers,
  files: fileReducer,
  profile: profileReducer
});
