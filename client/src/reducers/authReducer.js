import { FETCH_USER } from '../actions/types';

export default function authReducer(state = null, action) {
    console.log('authReducer called with action:', action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // if payload is empty, return false (not null)
    default:
      return state;
  }
}