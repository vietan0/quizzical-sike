import React from "react";
import Choice from "./Choice";
import {nanoid} from "nanoid";

export default function Quiz(props) {
	let [choiceTexts, setChoiceTexts] = React.useState(() => [
		props.correct_answer,
		...props.incorrect_answers,
	]);
	
	let [choices, setChoices] = React.useState(() => {
		let correct = [true, false, false, false];
		// combine two 1D arrays into a 2D array
		let order = choiceTexts.map((text, i) => ({
			text: text,
			correct: correct[i],
			selected: false,
		}));

		let randomed = [];
		for (let i = 1; i <= 3; i++) {
			// shuffle the choices
			let randomIndex = Math.floor(Math.random() * 3);
			randomed = [
				...order.slice(0, randomIndex),
				...order.slice(randomIndex + 1),
				order[randomIndex],
			];
		}
		return randomed;
	});

	let [choiceDivs, setChoiceDivs] = React.useState(() =>
		choices.map(c => (
			<Choice text={c.text} correct={c.correct} selected={c.selected} key={nanoid()} />
		))
	);
	return (
		<article className="quiz">
			{/* <pre>{JSON.stringify(choices, null, 4)}</pre> */}

			<h2>{props.question}</h2> 
			<div className="options">{choiceDivs}</div>
			<hr />
		</article>
	);
}
