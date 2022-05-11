import React from "react";
import Choice from "./Choice";
import {nanoid} from "nanoid";

export default function Quiz(props) {
	// combine two 1D arrays into a 2D array
	let [choices, setChoices] = React.useState(() =>
		[props.correct_answer, ...props.incorrect_answers].map((value, i) => ({
			text: value,
			correct: [true, false, false, false][i],
			selected: false,
			id: nanoid(),
		}))
	);

	function toggleSelect(selectedId) {
		setChoices(oldChoices =>
			oldChoices.map(obj =>
				selectedId === obj.id
					? {
							...obj,
							selected: !obj.selected,
					  }
					: {...obj, selected: false}
			)
		);
	}

	function unEscape(str) {
		const CONVERT_TABLE = {
			"&#039;": "'",
			"&quot;": '"',
			"&amp;": "&",
			"&lt;": "<",
			"&gt;": ">",
			"&ldquo;": "“",
			"&rdquo;": "”",
			"&lsquo;": "‘",
			"&rdquo;": "’",
			"&hellip;": "…",
		};
		let matches = str.match(/&[\S]{2,6}?;/g);
		if (!matches) return str;
		for (let i = 0; i < matches.length; i++) {
			str = str.replace(matches[i], CONVERT_TABLE[matches[i]]);
		}
		return str;
	}

	// shuffle the objects before render into <Choice />s
	React.useEffect(() => {
		setChoices(oldChoices => {
			for (let i = 1; i <= 3; i++) {
				let divs = [];
				let randomIndex = Math.floor(Math.random() * 3);
				divs = [
					oldChoices[randomIndex],
					...oldChoices.slice(0, randomIndex),
					...oldChoices.slice(randomIndex + 1),
				];
				return divs;
			}
		});
	}, []);

	let choiceDivs = choices.map(c => (
		<Choice
			text={c.text}
			correct={c.correct}
			selected={c.selected}
			key={c.id}
			id={c.id}
			toggleSelect={toggleSelect}
			unEscape={unEscape}
		/>
	));

	return (
		<article className="quiz">
			<h2>{unEscape(props.question)}</h2>
			<div className="options">{choiceDivs}</div>
			{/* <pre>{JSON.stringify(choices, null, 4)}</pre> */}
			<hr />
		</article>
	);
}
