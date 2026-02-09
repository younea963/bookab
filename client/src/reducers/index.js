import { combineReducers } from "redux";
import authReducer from "./authReducer";



export default combineReducers({
  auth: authReducer // key 'auth' is the piece of state produced by authReducer
   
});