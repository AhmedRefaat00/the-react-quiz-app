
function NextBtn({ dispatch, index, questions }) {
    console.log(questions.length)

    return (
        <>
            {index === questions.length-1 ?
                <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>Finish</button>
                :
                <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
            }
        </>

    )
}

export default NextBtn
