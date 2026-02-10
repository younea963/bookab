import react from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';  

const Landing = (props) => {
  const navigate = useNavigate()
    
      const newWord = () =>{
        navigate("/words/new")
      }

      const vocab = () =>{
        navigate('/word/list')
      }

      const game = () =>{
        navigate('/quiz')
      }

    const renderContent = () => {
        switch (props.auth) { // checking the auth prop which comes from mapStateToProps function at the bottom of the file
            case null:
                return; // do nothing, still deciding if logged in or not
            case false:
                return (
                    <div className="container">
      <div className="section">
        <h3 className="center-align">Welcome to Bookabulary!</h3>
        <p className="center-align grey-text text-darken-1">
          Save new words from your reading, then quiz yourself to remember them.
        </p>

        <div className="row">
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            <div className="card">
              <div className="card-content">
                <span className="card-title">How does it work?</span>

                <ul className="collection">
                  <li className="collection-item">
                    <i className="material-icons left">edit</i>
                    Add a new word + the book title when you learn it.
                  </li>
                  <li className="collection-item">
                    <i className="material-icons left">sports_esports</i>
                    Take a quiz to test if you remember the meaning.
                  </li>
                  <li className="collection-item">
                    <i className="material-icons left">auto_awesome</i>
                    Repeat — your vocabulary grows fast.
                  </li>
                </ul>

                <div className="divider" style={{ margin: "18px 0" }} />

                <h5 className="center-align" style={{ marginBottom: 6 }}>
                  Eager to start?
                </h5>
                <p className="center-align grey-text">
                  Login with your Google Account to save words and see your vocab list.
                </p>
              </div>

              <div className="card-action center-align">
                <a className="btn-large blue lighten-1" href="/auth/google">
                  Login with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                );
            default:
                return (
                  <div style={{ textAlign: 'center' }}>
            <h1>
                Bookabulary Homepage
            </h1>
            <div className = "quiz-container">
            <button className = "waves-effect waves-light btn-large blue lighten-1"
             onClick={newWord}>
                Add Word</button>
            <button className = "waves-effect waves-light btn-large blue lighten-1"
            onClick={vocab}>My vocabulary</button>
            <button className = "waves-effect waves-light btn-large blue lighten-1"
            onClick={game}>Play Quiz</button>
            </div>
        </div>
                )
        }
    }
    return <div>{renderContent()}</div>;
};


function mapStateToProps({ auth }) { // destructuring state to get auth property from it
  return { auth }; // returning an object with auth property. This will be available as props in the Header component
}

export default connect(mapStateToProps)(Landing);

