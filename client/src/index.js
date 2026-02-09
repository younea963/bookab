// this is the primary location for starting up the REDUX 
import 'materialize-css/dist/css/materialize.min.css'; // don't need a slash before 'materialize-css' bc it's in node_modules; when you're importing something from node_modules, just use the package name
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import {store} from './store'
import './index.css'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>  
    <App />
  </Provider>
  </React.StrictMode>
);
// Provider tag is a react component that reads changes from our Redux store and then informs all children components (which is everything the App renders) and UPDATES all those children components with the NEW state whenever the state in the Redux store change

console.log('STRIPE KEY IS:', process.env.REACT_APP_STRIPE_KEY);
console.log('ENVIRONMENT IS:', process.env.NODE_ENV);