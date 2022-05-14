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

	let [formData, setFormData] = useState(() => ({
		numberOfQuestions: "5",
		triviaCategory: "0",
		difficulty: "0",
	}));
	let [url, setUrl] = useState(
		() =>
			`https://opentdb.com/api.php?amount=${formData.numberOfQuestions}&category=${formData.triviaCategory}&difficulty=${formData.difficulty}&type=multiple`
	);

	// sync local storage with state
	useEffect(() => {
		localStorage.setItem("isBoarding", JSON.stringify(isBoarding));
		localStorage.setItem("quizzes", JSON.stringify(quizzes));
		localStorage.setItem("submitted", JSON.stringify(submitted));
		localStorage.setItem("allChoices", JSON.stringify(allChoices));
	}, [isBoarding, quizzes, submitted, allChoices]);

	function handleChange(e) {
		setFormData(oldData => ({
			...oldData,
			[e.target.name]: e.target.value,
		}));
	}

	// setUrl
	useEffect(() => {
		setUrl(
			`https://opentdb.com/api.php?amount=${formData.numberOfQuestions}&category=${formData.triviaCategory}&difficulty=${formData.difficulty}&type=multiple`
		);
	});

	function getNewQuizzes() {
		fetch(url)
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

	function reset() {
		setIsBoarding(true);
		setSubmitted(false);
	}

	function startSession() {
		setIsBoarding(false);
		getNewQuizzes();
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
			index={i}
			submitted={submitted}
		/>
	));

	let boardingScreen = () => {
		return (
			<div id="boarding-screen">
				<div className="left">
					<h1>Quizzical</h1>
					<pre>{JSON.stringify(url, null, 4)}</pre>
					<form action="#">
						<div>
							<label htmlFor="number-of-questions">
								<b>Number of Questions</b>
							</label>
							<input
								type="number"
								className="form-control"
								id="number-of-questions"
								name="numberOfQuestions"
								value={formData.numberOfQuestions}
								onChange={handleChange}
								min="1"
								max="50"
							></input>
						</div>
						<div>
							<label htmlFor="select-category">
								<b>Select Category</b>
							</label>
							<select
								name="triviaCategory"
								className="form-select"
								id="select-category"
								value={formData.triviaCategory}
								onChange={handleChange}
							>
								<option value="0">Any</option>
								<option value="9">General Knowledge</option>
								<option value="10">Entertainment: Books</option>
								<option value="11">Entertainment: Film</option>
								<option value="12">Entertainment: Music</option>
								<option value="13">Entertainment: Musicals &amp; Theatres</option>
								<option value="14">Entertainment: Television</option>
								<option value="15">Entertainment: Video Games</option>
								<option value="16">Entertainment: Board Games</option>
								<option value="17">Science &amp; Nature</option>
								<option value="18">Science: Computers</option>
								<option value="19">Science: Mathematics</option>
								<option value="20">Mythology</option>
								<option value="21">Sports</option>
								<option value="22">Geography</option>
								<option value="23">History</option>
								<option value="24">Politics</option>
								<option value="25">Art</option>
								<option value="26">Celebrities</option>
								<option value="27">Animals</option>
								<option value="28">Vehicles</option>
								<option value="29">Entertainment: Comics</option>
								<option value="30">Science: Gadgets</option>
								<option value="31">
									Entertainment: Japanese Anime &amp; Manga
								</option>
								<option value="32">Entertainment: Cartoon &amp; Animations</option>
							</select>
						</div>
						<div>
							<label htmlFor="difficulty">
								<b>Select Difficulty</b>
							</label>
							<select
								className="form-select"
								id="difficulty"
								name="difficulty"
								value={formData.difficulty}
								onChange={handleChange}
							>
								<option value="0">Any</option>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</select>
						</div>
						<button onClick={startSession}>Start Quiz</button>
					</form>
				</div>
				<div className="right">
					<iframe
						src="https://giphy.com/embed/nzUoWxCAMEzgCDO6P9"
						width="360"
						height="360"
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
				</div>
			</div>
		);
	};

	let mainScreen = () => {
		return (
			<div id="main-screen">
				<>{quizElements}</>
				<div id="bottom-row">
					{submitted && (
						<p className="result">
							{correctCount == 0 &&
								`You got ${correctCount}/${formData.numberOfQuestions} questions. Better luck next time?`}
							{correctCount > 0 &&
								correctCount < formData.numberOfQuestions &&
								`You got ${correctCount}/${formData.numberOfQuestions} questions right! Good job!`}
							{correctCount == formData.numberOfQuestions &&
								`✨Perfect✨ score! You should up the stakes!`}
						</p>
					)}
					<button onClick={submitted ? reset : checkAnswers}>
						{submitted ? "Replay" : "Check answers"}
					</button>
				</div>
			</div>
		);
	};

	return <>{isBoarding ? boardingScreen() : mainScreen()}</>;
}
