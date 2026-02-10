import react from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
                    <div style={{ textAlign: 'center' }}>
            <h1>
                Welcome to Bookabulary!
            </h1>

            <h4 >How does it work?</h4>
          <p style="text-align: left;"> 1. Each time you read a book and learn a new, unfamiliar word, log it here! 
            Input the new word along with the book title. </p>
            <br></br>
        <p style="text-align: left;">2. After that, test your knowledge through the quiz to see if you remember what the word means. </p>
        <p style="text-align: left;">It's as simple as that.</p>
        <h4>Eager to start? </h4> 
        <p style="text-align: left;">Login with your Google Account now.</p>

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
};


function mapStateToProps({ auth }) { // destructuring state to get auth property from it
  return { auth }; // returning an object with auth property. This will be available as props in the Header component
}

export default connect(mapStateToProps)(Landing);

