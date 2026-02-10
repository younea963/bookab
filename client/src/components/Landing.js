import react from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate()
    


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>
                Welcome to Bookabulary!
            </h1>
            <p>
                Collect and share your favourite book quotes.
            </p>
          <div class="col s12 m7">
    <h2 class="header">Horizontal Card</h2>
    <div class="card horizontal">
      <div class="card-image">
      </div>
      <div class="card-stacked">
        <div class="card-content">
            <h3>How does it work?</h3>
          <p>Each time you read a book and learn a new, unfamiliar word, log it here! 
            Input the new word along with the book title. </p>
        <p>After that, test your knowledge through the quiz to see if you remember what the word means. </p>
        <p>It's as simple as that.</p>
        <h3>Eager to start? Login with your Google Account now.</h3>
        </div>

      </div>
    </div>
  </div>
        </div>
    );
};

export default Landing;