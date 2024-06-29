import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextBtn from './components/NextBtn';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';

const initialState = { questions: [], status: 'loading', index: 0, answer: null, points: 0, highscore: 0, tick: null };
const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active', tick: state.questions.length * SECS_PER_QUESTION };
    case 'newAnswer':
      const point = action.payload === state.questions[state.index].correctOption ? state.questions[state.index].points : 0
      return { ...state, answer: action.payload, points: state.points + point }
    case 'nextQuestion':
      return { ...state, index: state.index++, answer: null }
    case 'finish':
      return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }
    case 'restart':
      return { ...initialState, status: 'ready', questions: state.questions, highscore: state.highscore }
    case 'decTimer':
      return { ...state, tick: state.tick - 1, status: state.tick === 0 ? 'finished' : state.status }

    default:
      throw new Error('unknown action type');
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, tick }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((per, cur) => per + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Progress index={index} numQuestions={numQuestions} maxPossiblePoints={maxPossiblePoints} points={points} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            {answer !== null && <NextBtn dispatch={dispatch} questions={questions} index={index} />}
            {<Timer dispatch={dispatch} tick={tick} />}
          </>}
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} highscore={highscore} />}
      </Main>
    </div>
  );
}
