
import { useMemo } from 'react';



const Answers = ({answers, selectedAnswer, answerState, onSelect}) => {

    const shuffledAnswers = useMemo(()=>{
        return [...answers].sort(()=>Math.random()-0.5)
    }, [answers])


    return (
    <ul id="answers"  className ="quiz-answer-container">
          {shuffledAnswers.map((ans) => {
            const isSelected = selectedAnswer === ans

            let cssClass = '';

            if (answerState==='answered' && isSelected) {
              cssClass = 'selected'
            }

            if ((answerState ==='correct' || answerState === 'false') && isSelected) {
              cssClass = answerState
            }

            return (
              <li key ={answers}>
                  <button className = "waves-effect waves-light btn-large blue lighten-1" onClick = { () => onSelect(ans)} disabled={isSelected}>{ans}</button>
              </li>
            )
            
          })}
    </ul>
    
)}

export default Answers