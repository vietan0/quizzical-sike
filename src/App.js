import React, {useState, useEffect} from "react";
import Quiz from "./components/Quiz";
import {nanoid} from "nanoid";

export default function App() {
	let [isBoarding, setIsBoarding] = useState(
		() => JSON.parse(localStorage.getItem("isBoarding")) || true
	);
	let [quizzes, setQuizzes] = useState(() => JSON.parse(localStorage.getItem("quizzes")) || []);
	let [ansStatus, setAnsStatus] = useState(() => {});
	let [submitted, setSubmitted] = useState(false);
	let [correctCount, setCorrectCount] = useState(0);

	// sync local storage with state
	useEffect(() => {
		localStorage.setItem("isBoarding", JSON.stringify(isBoarding));
		localStorage.setItem("quizzes", JSON.stringify(quizzes));
	}, [isBoarding, quizzes]);

	function getNewQuizzes() {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
			.then(res => res.json())
			.then(data =>
				setQuizzes(data.results.map(obj => ({...obj, ansStatus: false, id: nanoid()})))
			);
	}

	function startSession() {
		setIsBoarding(false);
		getNewQuizzes();
		setSubmitted(false);
		window.scrollTo(0, 0);
	}

	function updateAnsStatus(selectedId) {
		setQuizzes(quizzes =>
			quizzes.map(quizObj =>
				selectedId === quizObj.id ? {...quizObj, ansStatus: !quizObj.ansStatus} : quizObj
			)
		);
	}

	function checkAnswers() {
		setSubmitted(true);
		setCorrectCount(quizzes.filter(quizObj => quizObj.ansStatus).length);
	}

	let quizElements = quizzes.map(q => (
		<Quiz
			question={q.question}
			correct_answer={q.correct_answer}
			incorrect_answers={q.incorrect_answers}
			ansStatus={q.ansStatus}
			updateAnsStatus={updateAnsStatus}
			id={q.id}
			key={q.id}
		/>
	));
	return (
		<div id="container">
			{isBoarding ? (
				<>
					<h1>Quizzical</h1>
					<button onClick={startSession}>Start Quiz</button>
					<iframe
						src="https://giphy.com/embed/M9fk9xXoSS3JI7Ozig"
						width="480"
						height="270"
						frameBorder="0"
						className="giphy-embed"
						allowFullScreen
					></iframe>
				
					<small>
						Built using{" "}
						<a href="https://opentdb.com/api_config.php" target="_blank">
							Open Trivia Database
						</a>
					</small>
				</>
			) : (
				<>
					<>{quizElements}</>
					<button
						onClick={!submitted ? checkAnswers : startSession}
						className="check-answer"
					>
						{submitted ? "Replay" : "Check answers"}
					</button>
					{submitted && (
						<p className="result">
							You got {correctCount}/5 questions right! Good job! ✨
						</p>
					)}
				</>
			)}
		</div>
	);
}
