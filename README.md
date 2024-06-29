# README

## Overview

This project is a quiz application built with React, utilizing the `useReducer` and `useEffect` hooks for state management and side effects. The application fetches questions from an API, allows users to answer them within a time limit, and keeps track of their score and high score.

## Folder Structure

```
my-quiz-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Main.js
│   │   ├── Loader.js
│   │   ├── Error.js
│   │   ├── StartScreen.js
│   │   ├── Question.js
│   │   ├── NextBtn.js
│   │   ├── Progress.js
│   │   ├── FinishScreen.js
│   │   └── Timer.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Components

- **Header**: Displays the header of the application.
- **Main**: Wraps the main content of the application.
- **Loader**: Displays a loading spinner when data is being fetched.
- **Error**: Displays an error message if data fetching fails.
- **StartScreen**: Displays the start screen with the number of questions and a start button.
- **Question**: Displays the current question and options for the user to answer.
- **NextBtn**: Displays the next button to proceed to the next question.
- **Progress**: Displays the progress of the quiz including the current question index, total questions, maximum possible points, and current points.
- **FinishScreen**: Displays the final score, high score, and a restart button.
- **Timer**: Displays a countdown timer for each question.

## State Management

The application uses the `useReducer` hook to manage the state. The initial state and the reducer function are defined as follows:

### Initial State

```javascript
const initialState = { 
  questions: [], 
  status: 'loading', 
  index: 0, 
  answer: null, 
  points: 0, 
  highscore: 0, 
  tick: null 
};
```

### Reducer Function

The reducer function handles the following action types:

- `dataReceived`: Sets the questions and updates the status to 'ready'.
- `dataFailed`: Sets the status to 'error' if data fetching fails.
- `start`: Starts the quiz and sets the timer.
- `newAnswer`: Updates the state with the new answer and points.
- `nextQuestion`: Moves to the next question.
- `finish`: Ends the quiz and updates the high score.
- `restart`: Restarts the quiz.
- `decTimer`: Decrements the timer and checks if the time is up.

## Fetching Data

The `useEffect` hook is used to fetch the questions from an API when the component mounts.

```javascript
useEffect(() => {
  fetch('http://localhost:3001/questions')
    .then((res) => res.json())
    .then((data) => dispatch({ type: 'dataReceived', payload: data }))
    .catch((err) => dispatch({ type: 'dataFailed' }));
}, []);
```

## Running the Application

To run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/AhmedRefaat00/my-quiz-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd my-quiz-app
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Start the application:
   ```sh
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Conclusion

This quiz application demonstrates how to build a React application with multiple components, manage state with `useReducer`, handle side effects with `useEffect`, and fetch data from an API. Enjoy building and extending this project!
