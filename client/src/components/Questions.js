import { useState } from "react"
import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import {useSelector } from "react-redux";
import { useMemo } from "react";




const Questions = ({word, questionKey, onSelectAnswer, onSkipAnswer, difficulty}) => {

    const {items: ran_words, status, error} = useSelector((state) => state.ran_words); // get the RAN words state from the redux store



    
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    const ran_answers = useMemo(()=> {
        return ran_words
        .filter(ran_word=>ran_word.difficulty_type === difficulty)
        .sort(()=> Math.random()-0.5)
        .slice(0,3)
        .map(ran_word => ran_word.gen_words)
    }, [ran_words, difficulty, word.id])


     const poss_answers = useMemo(()=>{
        return [word.synonym, ...ran_answers].filter(Boolean)
    }, [word.synonym, ran_answers])

    if (status === "loading") return <p>Loading…</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    



    

    let timer = 10000;

    if (answer.selectedAnswer){
        timer = 1000;
    }

    function handleSelectAnswer(selected){
        setAnswer({
            selectedAnswer: selected,
            isCorrect: null
        }
        )
        setTimeout(()=>{
            setAnswer({
            selectedAnswer: selected,
            isCorrect: word.synonym === selected
        }
        )

        setTimeout(()=>{
            onSelectAnswer(selected)
        }, 300)
        })
    }

    let answerState = ''

    if(answer.selectedAnswer && answer.isCorrect != null ){
        answerState = answer.isCorrect ? 'correct' : 'false'
    } else if (answer.selectedAnswer) {
        answerState = 'answered'
    }

 

    
    


    console.log("difficulty selected:", difficulty);
    console.log("ran_words sample:", ran_words?.[0]);
    console.log("ran_words difficulty_type values:", ran_words?.map(r => r.difficulty_type));



   

    return (
        <div>
            <div className = "quiz-top-section-container">
                <h2>Quiz</h2>
                <QuestionTimer
                    key = {timer}
                timeout={timer} 
                onTimeOut={answer.selectedAnswer=== '' ? onSkipAnswer : null} 
                mode={answerState}
                />
        </div>
        <h2 className = "quiz-question-container">{word.word} </h2>
        <Answers 
          answers={poss_answers} 
          selectedAnswer={answer.selectedAnswer}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
        </div>
    )


}

export default Questions