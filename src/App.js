import React from "react";
import Quiz from "./components/Quiz";

export default function App() {
	let [quizzing, setQuizzing] = React.useState(false);
	return (
		<div id="container">
			{quizzing ? (
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
				<h1>Quizzing</h1>
			)}
		</div>
	);
}
