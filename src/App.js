import React from "react";
import Quiz from "./components/Quiz";
import {nanoid} from "nanoid";

export default function App() {
	let [isBoarding, setIsBoarding] = React.useState(
		() => JSON.parse(localStorage.getItem("isBoarding")) || false // reset later
	);

	let [quizzes, setQuizzes] = React.useState(
		() => JSON.parse(localStorage.getItem("quizzes")) || []
	);

	// sync local storage with state
	React.useEffect(() => {
		localStorage.setItem("isBoarding", JSON.stringify(isBoarding));
		localStorage.setItem("quizzes", JSON.stringify(quizzes));
	}, [isBoarding, quizzes]);

	function getNewQuizzes() {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
			.then(res => res.json())
			.then(data =>
				setQuizzes(data.results.map(obj => ({...obj, isAnsweredCorrectly: false})))
			);
	}

	function startQuiz() {
		setIsBoarding(false);
		getNewQuizzes();
	}

	/* 
		checkAnswers() {
			// setIsAnsweredCorrectly: true
		}

		then pass function down to <Quiz checkAnswers = {checkAnswers} />
	*/

	let quizElements = quizzes.map(q => (
		<Quiz
			question={q.question}
			correct_answer={q.correct_answer}
			incorrect_answers={q.incorrect_answers}
			key={nanoid()}
			// isAnsweredCorrectly={q.isAnsweredCorrectly}
		/>
	));
	return (
		<div id="container">
			{isBoarding ? (
				<>
					<h1>Quizzical</h1>
					<p>
						Built using{" "}
						<a href="https://opentdb.com/api_config.php" target="_blank">
							Open Trivia Database
						</a>
					</p>
					<button onClick={startQuiz}>Start Quiz</button>
				</>
			) : (
				<>
					<button className="get-quizzes" onClick={getNewQuizzes}>
						Get new quizzes
					</button>
					<>{quizElements}</>
					<pre>{JSON.stringify(quizzes, null, 4)}</pre>
					<button className="check-answer">Check answer</button>
				</>
			)}
		</div>
	);
}
