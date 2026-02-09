import { fetchWords } from "../actions";

// this component is responsible for displaying the list of words inputted by the user
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchData} from "../reduxFolder/wordsSlice"

const WordList = () => {
  const dispatch = useDispatch();
  const {items: words, status, error} = useSelector((state) => state.words); // get the words state from the redux store
  
  const formattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // dispatch(fetchWords()); // fetch the words when the component mounts
    dispatch(fetchData());

  }, [dispatch]);
   

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const sortedWords = [...words].reverse();

  

  return (
    <div>
      {sortedWords.length === 0 ? (
        <p>No words found. Please add some words!</p>
      ) : (
        <table>
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Book</th>
                    <th>Date Added</th>
                    <th>Synonym</th>
                </tr>
            </thead>
            <tbody>
          {sortedWords.map((word) => (
            <tr key={word.id}>
              <td>{word.word}</td>
              <td>{word.title}</td>
              <td>{formattedDate(word.date_added)}</td>
              <td>{word.synonym}</td>
            </tr>
            ))}
            </tbody>
          
        </table>
      )}
    </div>
  );
};

export default WordList;