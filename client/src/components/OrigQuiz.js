// user plays game where they test their vocabulary knowledge
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


const Quiz = () => {
  const [word, setWord] = useState([]);
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();
  const words = useSelector((state) => state.words || []); // get the words state from the redux store. 
  


  useEffect(() => {
    dispatch(fetchWords()); // fetch the words when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setWord(randomWord.word); // set a random word from the user's words
    }
  }, [words]); // the second argument is the dependency array. It tells React to only re-run this effect if the words array changes.
   
  console.log('this is the word', word);
    console.log('this is the words', words);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/game/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer }),
    });
    const data = await res.text();
    setResponse(data);
  };

  return (
    <div>
      <h1>Vocabulary Quiz</h1>
      <p>{word}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          required 
        />
        <button type="submit">Submit Answer</button>
      </form>
      {response && <p>{response}</p>} 
     
    </div>
  ); 
};



export default Quiz;