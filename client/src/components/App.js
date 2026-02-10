// if file is exporting components, then filename will be capitalized
// if file is exporting only functions (e.g. index.js, authReducer.js), then filename will be lowercase
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// browserrouter is a component that keeps the UI in sync with the URL 
// Route is a component that renders some UI when its path matches the current URL
import {connect} from 'react-redux';
import * as actions from '../actions'; // import all action creators from actions index.js file
// components
import Header from './Header';
import Landing from './Login';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import WordNew from './WordNew';
import Quiz from './Quiz';









const App = (props) => {
useEffect(() => { // useEffect hook to fetch user data when the component mounts. The component is the App component here. Mounts means it gets rendered to the DOM for the first time
    props.fetchUser(); // call the fetchUser action creator to get the current user data from the backend
}, []); // empty dependency array means this useEffect runs only once when the component is mounted

    return (
      // PROVIDER is a REACT COMPONENT that is provided by REACT-REDUX LIBRARY
      // it provides the STORE to all components in the app
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/words/new" element={<WordNew />} />
            <Route path="/words" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    );
  }


export default connect(null, actions)(App); // first argument is mapStateToProps (null here bc we don't need any state in this component), second argument is the action creators object
// connect function connects the App component to the Redux store. It makes the action creators available as props in the App component
// the first argument to connect is null because we don't need any state from the Redux store in this component. This is because the App component only needs to fetch the user data when it mounts, it doesn't need to read any state from the store. 
// The second argument is the actions object which contains all the action creators. This makes all the action creators available as props in the App component. So we can call props.fetchUser() to fetch the user data when the component mounts.



