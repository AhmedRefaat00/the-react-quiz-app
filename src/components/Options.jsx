export default function Options({ question, dispatch, answer }) {
    return (
        <div className="options">
            {question.options.map((option, index) =>
                <button
                    className={`btn btn-option 
                    ${index === answer && 'answer'} 
                    ${answer !== null ? question.correctOption === index ? 'correct' : "wrong" : ''}
                    `}
                    key={option}
                    disabled={answer !== null ? true : false}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                >
                    {option}

                </button>)}

        </div>
    )

}
