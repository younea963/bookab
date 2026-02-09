// where user enters a new word to be added to the database
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWord } from "../reduxFolder/wordsSlice";; // import the addWord action creator. The addWord action creator is responsible for sending the new word to the backend and updating the redux store


const WordNew = () => {
  const [word, setWord] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault(); // prevent the default form submission behavior
    await dispatch(addWord({ word, title }));  // dispatch the addWord action creator with the new word and title. This will send the data to the backend and update the redux store
    // send form data to the backend and update redux store

    navigate("/words"); // redirect to dashboard after adding the word
  };

  return (
    <div>
      <h2>Add a New Word</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Word:</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required // make the input required
          />
        </div>
        <div>
          <label>Book:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          />
        </div>
        <button className = "waves-effect waves-light btn-large blue lighten-1" type="submit">Add Word</button>
      </form>
    </div>
  );
};

export default WordNew;