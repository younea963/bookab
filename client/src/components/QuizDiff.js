
const QuizzDiff = ({diffType}) => {
    
    return (
        <div>
            <h1 className = "blue-grey-text text-darken-3 center-align">Choose difficulty type</h1>
            <div className = "quiz-container">
            <button className = "waves-effect waves-light btn-large blue lighten-1"
             onClick={() => diffType("easy")}>
                Easy</button>
            <button className = "waves-effect waves-light btn-large blue lighten-1"
            onClick={() => diffType("medium")}>Medium</button>
            <button className = "waves-effect waves-light btn-large blue lighten-1"
            onClick={() => diffType("hard")}>Hard</button>
            </div>
        </div>
    )

};

export default QuizzDiff;