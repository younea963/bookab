
import { fetchRan } from "../reduxFolder/ranSlice";

// this component is responsible for displaying the list of words inputted by the user
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../reduxFolder/wordsSlice";

import Questions from "./Questions";
import Summary from "./Summary";
import QuizzDiff from "./QuizDiff"

const Quiz = () => {

  const dispatch = useDispatch();
  const {items: words, status, error} = useSelector((state) => state.words); // get the words state from the redux store

  const [difficulty, setDifficulty] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])

  const ranState = useSelector((state) => state.ran_words);
  console.log("RAN status:", ranState.status);
  console.log("RAN items length:", ranState.items?.length);


  useEffect(()=> {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => { // useEffect will RUN in the FIRST render. Since difficulty is NULL (user has NOT picked difficulty type), NOTHING happens
    if(difficulty){
      dispatch(fetchRan(difficulty))
    } setUserAnswers([]);
  }, [dispatch, difficulty]); // if dispatch or difficulty (user clicks on button & difficulty is nO LONGER null) change, THEN REexecute if statement code


  

  
  
  
  
  const handleSelectAnswer = useCallback((selectedAnswer) =>{
    setUserAnswers((prevUserAnswers) =>  [...prevUserAnswers, selectedAnswer])
    }, [])
    
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  if(!difficulty) {
    return <QuizzDiff diffType={setDifficulty} />
  }

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  if (ranState.status === "loading") return <p>Loading random words…</p>;
  if (ranState.status === "failed") return <p>Error: {ranState.error}</p>;


  const sortedWords = [...words].reverse();
    //  let questions_length = 0
  const questionsLength = sortedWords.length

  const activeQuestionIndex = userAnswers.length 
  const quizIsComplete = activeQuestionIndex === questionsLength

  if (quizIsComplete) {
    return  <Summary userAnswers={userAnswers} words={sortedWords} difficulty={difficulty}/>
  }

  const currentWord = sortedWords[activeQuestionIndex];
  console.log("words length:", words?.length);
  console.log("first word:", words?.[0]);

  
  const formattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  
  
  return (
    <div>
      {sortedWords.length === 0 ? (
        <p>No words found. Please add some words!</p>
      ) : (
      <div>
      <Questions 
      key = {activeQuestionIndex}
      questionKey  = {activeQuestionIndex}
      word = {currentWord}
      onSelectAnswer = {handleSelectAnswer}
      onSkipAnswer = {handleSkipAnswer}
      difficulty = {difficulty}
      />
      </div>
      )}
    </div>
  );
};

export default Quiz;