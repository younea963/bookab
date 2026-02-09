import { useState, useEffect} from 'react'


const QuestionTimer = ({ timeout, onTimeOut, mode }) => {
    const[remainingTime, setRemainingTime] = useState(timeout)

    useEffect(()=> {
        const timer = setTimeout(onTimeOut, timeout);

        return()=>{
            clearTimeout(timer)
        }
    }, [timeout, onTimeOut])
    
    

    useEffect(()=> {
        const interval = setInterval(()=>{
            setRemainingTime(prevRemainingTime => prevRemainingTime -100, 0)
        }, 100)

        return () => {
            clearInterval(interval)
        }
        }, [])

const timer_in_seconds = Math.ceil(remainingTime/1000)

return (
    <div className={mode} max={timeout}>
    <h2 className = "quiz-timer-container">Time remaining {timer_in_seconds} </h2>
    </div>
)
}
export default QuestionTimer;