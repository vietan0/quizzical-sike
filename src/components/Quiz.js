import React from "react";
import Choice from "./Choice";
import {nanoid} from "nanoid";

export default function Quiz(props) {
	let [choiceTexts, setChoiceTexts] = React.useState(() => [
		props.correct_answer,
		...props.incorrect_answers,
	]);
	let correct = [true, false, false, false];

	// combine two 1D arrays into a 2D array
	let [choices, setChoices] = React.useState(() =>
		choiceTexts.map((text, i) => ({
			text: text,
			correct: correct[i],
			selected: false,
		}))
	);

	let [choiceDivs, setChoiceDivs] = React.useState(() => {
		let divs = choices.map(c => (
			<Choice text={c.text} correct={c.correct} selected={c.selected} key={nanoid()} />
		));
		for (let i = 1; i <= 3; i++) {
			// shuffle the divs
			let randomIndex = Math.floor(Math.random() * 3);
			divs = [
				divs[randomIndex],
				...divs.slice(0, randomIndex),
				...divs.slice(randomIndex + 1),
			];
		}
		return divs;
	});

	return (
		<article className="quiz">
			<pre>{JSON.stringify(props, null, 4)}</pre>
			{/* <pre>{JSON.stringify(choices, null, 4)}</pre> */}

			<h2>{props.question}</h2>
			<div className="options">{choiceDivs}</div>
			<hr />
		</article>
	);
}
