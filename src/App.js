import React from "react";
import Quiz from "./components/Quiz";

export default function App() {
	let [isQuizzing, setIsQuizzing] = React.useState(false);
	let [quizzes, setQuizzes] = React.useState([]);

	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple")
			.then(res => res.json())
			.then(data => setQuizzes(data.results));
	}, []);

	let quizElements = quizzes.map(q => (
		<Quiz
			question={q.question}
			correct_answer={q.correct_answer}
			incorrect_answers={q.incorrect_answers}
		/>
	));
	console.log(quizElements);
	return (
		<div id="container">
			{isQuizzing ? (
				<>
					<h1>Quizzical</h1>
					<p>
						Built using{" "}
						<a href="https://opentdb.com/api_config.php" target="_blank">
							Open Trivia Database
						</a>
					</p>
					<button>Start Quiz</button>
				</>
			) : (
				<>
					{quizElements}
				</>
			)}
		</div>
	);
}
