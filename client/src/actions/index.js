import axios from 'axios';
import { FETCH_USER } from './types';
// import { FETCH_WORDS } from './types'; // FETCH_WORDS is the action type for fetching words



// Action creator to fetch the current user
export const fetchUser = () => async (dispatch) => { //fetchUser is going to be exported to the components that need it.
  const res = await axios.get('/api/current_user', { withCredentials: true });

  dispatch({ type: FETCH_USER, payload: res.data }); // the first argument is the action type, the second is the payload (data). So  the payload is the user data returned from the backend 
};




// Action creator to handle Stripe token and update user credits
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', {token}, { withCredentials: true }); // send the token to the backend

  dispatch({ type: FETCH_USER, payload: res.data }); // update the user data in the header with new credits
};



// Action creator to handle user logout
export const logoutUser = () => async (dispatch) => {
  const res = await axios.get('/api/logout', { withCredentials: true });

  dispatch({ type: FETCH_USER, payload: res.data });
};


