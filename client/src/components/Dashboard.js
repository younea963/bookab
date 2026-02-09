// where user can sees option to start a new game, view stats, and submit a new word
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WordList from './WordList';

const Dashboard = () => {
  const navigate = useNavigate()

  const onClick = () =>{
    navigate('/quiz')
  }

  const newWord = () =>{
        navigate("/words/new")
      }

  return (
    <div>
      <h1>My (book)abulary</h1>
      <WordList />
      <br />

      <br /><br />
      <div className = "dash-button-container">
      <button className = "waves-effect waves-light btn-large blue lighten-1" onClick={onClick}>Start New Game</button>
      
      <button className = "waves-effect waves-light btn-large blue lighten-1"
             onClick={newWord}>
                Submit New Word</button>
      </div>
    </div>
  );
};

export default Dashboard;