import React from "react";
import { Link } from "react-router-dom"; // link is a component that is used to create links to different routes; it is like an anchor tag but it prevents full page reloads. This is because anchor tags cause a full page reload (by navigating to a different HTML file) which is not ideal in a single page application like React
import {connect} from 'react-redux';   
import Payments from "./Payments"; 


const Header = (props) => {
    const renderContent = () => {
        switch (props.auth) { // checking the auth prop which comes from mapStateToProps function at the bottom of the file
            case null:
                return; // do nothing, still deciding if logged in or not
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return [
                    <li key="1">
                        <Payments />
                    </li>,
                    <li key ="3" style={{ margin: "0 10px" }}> 
                    {/* // 0 = top/bottom margin, 10px = left/right margin */}
                        Credits: {props.auth?.credits} 
                        {/* // taken from switch default case which is the logged in user object */}
                    </li>,
                    <li key="2" style={{ margin: "0 10px" }}>
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }
    console.log(props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
          to={props.auth ? "/" : "/"} 
          className="brand-logo left" style={{ marginLeft: "10px" }}>
            Bookabulary
          </Link>
          <ul id="nav-mobile" className="right">
            {renderContent()}
        </ul>
      </div>
    </nav>
  );
};


function mapStateToProps({ auth }) { // destructuring state to get auth property from it
  return { auth }; // returning an object with auth property. This will be available as props in the Header component
}

export default connect(mapStateToProps)(Header);