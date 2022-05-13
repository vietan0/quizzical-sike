import React, {useState, useEffect} from "react";
import Quiz from "./components/Quiz";
import {nanoid} from "nanoid";

export default function App() {
	let [isBoarding, setIsBoarding] = useState(
		() => JSON.parse(localStorage.getItem("isBoarding")) || false
	);
	let [quizzes, setQuizzes] = useState(() => JSON.parse(localStorage.getItem("quizzes")) || []);
	let [submitted, setSubmitted] = useState(
		() => JSON.parse(localStorage.getItem("submitted")) || false
	);
	let [allChoices, setAllChoices] = useState(
		() => JSON.parse(localStorage.getItem("allChoices")) || []
	);
	let [correctCount, setCorrectCount] = useState(0);

	// sync local storage with state
	useEffect(() => {
		localStorage.setItem("isBoarding", JSON.stringify(isBoarding));
		localStorage.setItem("quizzes", JSON.stringify(quizzes));
		localStorage.setItem("submitted", JSON.stringify(submitted));
		localStorage.setItem("allChoices", JSON.stringify(allChoices));
	}, [isBoarding, quizzes, submitted, allChoices]);

	function getNewQuizzes() {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
			.then(res => res.json())
			.then(data => {
				let quizArr = data.results.map(obj => ({...obj, ansStatus: false, id: nanoid()}));
				setQuizzes(quizArr);
				setAllChoices(
					quizArr.map(obj => ({
						choicesArr: [obj.correct_answer, ...obj.incorrect_answers]
							.map((value, i) => ({
								text: value,
								correct: [true, false, false, false][i],
								selected: false,
								id: nanoid(),
							}))
							.sort(() => Math.random() - 0.5),
						quizId: obj.id,
					}))
				);
			});
	}

	function startSession() {
		setIsBoarding(false);
		getNewQuizzes();
		setSubmitted(false);
		window.scrollTo(0, 0);
	}

	function toggleSelect(selectedQuizId, selectedChoiceId) {
		setAllChoices(oldArr =>
			oldArr.map(obj =>
				selectedQuizId === obj.quizId
					? {
							quizId: obj.quizId,
							choicesArr: obj.choicesArr.map(choiceObj =>
								selectedChoiceId === choiceObj.id
									? {...choiceObj, selected: !choiceObj.selected}
									: {...choiceObj, selected: false}
							),
					  }
					: obj
			)
		);
	}

	function updateAnsStatus(selectedId, correct, selected) {
		setQuizzes(quizzes =>
			quizzes.map(quizObj =>
				selectedId === quizObj.id
					? {...quizObj, ansStatus: correct ? (selected ? false : true) : false}
					: quizObj
			)
		);
	}

	function checkAnswers() {
		setSubmitted(true);
		setCorrectCount(quizzes.filter(quizObj => quizObj.ansStatus).length);
	}

	let quizElements = quizzes.map((q, i) => (
		<Quiz
			question={q.question}
			choices={allChoices[i]}
			toggleSelect={toggleSelect}
			ansStatus={q.ansStatus}
			updateAnsStatus={updateAnsStatus}
			id={q.id}
			key={q.id}
			submitted={submitted}
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
						Built with data from{" "}
						<a href="https://opentdb.com/api_config.php" target="_blank">
							Open Trivia Database
						</a>
					</small>
				</>
			) : (
				<>
					<>{quizElements}</>
					<div id="bottom-row">
						{submitted && (
							<p className="result">
								{correctCount <= 1 && `You can do better next time!`}
								{correctCount > 1 &&
									correctCount < 5 &&
									`You got ${correctCount}/5 questions right! Good job!`}
								{correctCount == 5 &&
									`✨Perfect ✨ score! You should up the stakes!`}
							</p>
						)}
						<button onClick={submitted ? startSession : checkAnswers}>
							{submitted ? "Replay" : "Check answers"}
						</button>
					</div>
				</>
			)}
		</div>
	);
}
