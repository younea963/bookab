import react from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate()
    
      const newWord = () =>{
        navigate("/words/new")
      }

      const vocab = () =>{
        navigate('/words')
      }

      const game = () =>{
        navigate('/quiz')
      }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
                Welcome to Bookabulary!
            </h1>
            <p>
                Collect and share your favorite book quotes.
            </p>
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
    );
};

export default Landing;