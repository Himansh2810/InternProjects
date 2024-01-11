import { combineReducers } from "redux";
import userReducer from "./UserDetails/userReducer";
import themeReducer from "./theme/themeReducer";

export default combineReducers({
  userReducer,
  themeReducer
});
