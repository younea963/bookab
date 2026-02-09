// dispatch ({ type: FETCH_USER, payload: res.data }); // this updates the user data in the header with new credits


// let user input a word from a book they are reading
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // this is to dispatch an action to update user data
import { FETCH_USER } from '../actions/types'; // to update user data in the header
import { redirect, useNavigate } from 'react-router-dom'; // to redirect after submission
import { fetchData } from '../reduxFolder/wordsSlice'




const Word = () => {
  const [word, setWord] = useState(''); // this is the new word inputted by the user
  const [title, setTitle] = useState(''); // this is the book where the word was found
//   const [sentence, setSentence] = useState(''); // this is a sentence using the word
//   const [userAnswer, setUserAnswer] = useState(''); // this is the user's answer to a quiz question
  
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend server
    const res = await axios.post('/api/words', { word, title }, { withCredentials: true });
      dispatch(fetchUser())
      navigate('/words'); // redirect to /words after successful insertion
    };
    

    console.log({ word, title });
    
  };

  return (
    <div>
      <h2>Submit a New Word</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Word:</label>
          <input type="text" value={word} onChange={(e) => setWord(e.target.value)} required />
        </div>
      
        <div>
          <label>Book:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <button className = "waves-effect waves-light btn-large blue lighten-1"type="submit">Submit Word</button>
      </form>
    </div>
  );


export default Word;