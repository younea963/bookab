import Answers from "./Answers"
import { useDispatch, useSelector } from "react-redux";
import {fetchData} from "../reduxFolder/wordsSlice"
import { useEffect } from "react";
import Quiz from "./Quiz"
import {addScore} from "../reduxFolder/scoreSlice"
import {addOverallScore, fetchOverallScore} from "../reduxFolder/overallSlice"
import { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Summary = ({userAnswers, words, difficulty}) =>{
    const dispatch = useDispatch();
    const {items: overall, status, error} = useSelector((state) => state.overall); // get the score state from the redux store

    const skippedAnswers = userAnswers.filter(answer => answer === null)
    // const correctAnswers = userAnswers.filter((answer, questionKey) => answer === correct_answer)
    const correctAnswers = userAnswers.filter((answer, idx) => {
    return answer === words[idx]?.synonym;
  });
    
    

    
    
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) *100)
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) *100)
    const incorrectAnswersShare = 100 - skippedAnswersShare - correctAnswersShare 

    
    const today = new Date()

    useEffect(() => { 
          dispatch(fetchOverallScore())
      }, [dispatch]); 
  
    const postedRef = useRef(false);
    useEffect(() => { 
        if (postedRef.current) return;
        if (!difficulty) return;
        
        postedRef.current = true;
          dispatch(addOverallScore({difficulty, score: correctAnswersShare}))
      }, [dispatch, difficulty, correctAnswersShare]); 


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
    
    if (status === "loading") return <p>Loading…</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    const best = overall?.[0];
    
    function highest_score (correctAnswersShare, best){
        if (!best){
            return "No previous score yet. This is your first game!"
        }
        if (correctAnswersShare>Number(best.score)){
            return `New highest score, well done! Highest score:  ${correctAnswersShare}`
        }
        else return `Highest score: ${best.score}%`
        //  else return `Highest score from ${new Date(best.played_at).toLocaleString()}: ${best.score}%`
    }
    
    
    return(
    <div>
      <h2>Quiz Completed!</h2>
      <div className = "quiz-top-section-container">
      <h5>Score: {correctAnswersShare}%</h5>
      <h5>{highest_score(correctAnswersShare, best)}</h5>
      </div>
      {/* <p>
        <span>{skippedAnswersShare}</span>
        <span> skipped</span>
      </p>
      <p>
        <span>{correctAnswersShare}</span>
        <span> correct</span>
      </p>
      <p>
        <span>{incorrectAnswersShare}</span>
        <span> incorrect</span>
      </p> */}
    

        {/* {userAnswers.map((answer, word) => {
            let cssClass = 'user-answer'
            if (answer === null){
                cssClass+= ' skipped'
            } else if (answer === correct_answer) {
                cssClass += ' correct'
            } else {
                cssClass += ' incorrect'
            }
            return (
            <li key={questionKey}>
                <h3>{word.word}</h3> 
                <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
            )
        })} */}
    

            <table>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Synonym</th>
                        <th>Answer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                     {userAnswers.map((answer, idx) => {
                        const word = words[idx];
                        const correct = word?.synonym;

                        let status_word 
                        if (answer === null) status_word = "Skipped";
                        else if (answer === correct) status_word = "Correct";
                        else  status_word = " Incorrect";
                        return(
                        <tr key={word?.id ?? idx}>
                        <td>{word?.word}</td>
                        <td>{correct}</td>
                        <td>{answer ?? "Skipped"}</td>
                        <td>{status_word} </td>
                        </tr>
                        )
                    })}
                </tbody>
                </table>


            <div className = "quiz-summary-container">
            <button className = "waves-effect waves-light btn-large blue lighten-1"
             onClick={newWord}>
                Add Another Word</button>
            <button className = "waves-effect waves-light btn-large blue lighten-1"
            onClick={vocab}>Return to vocabulary</button>
            </div>   
        

    </div>
    )
}

export default Summary