import React, {useState, useEffect} from "react";
import Choice from "./Choice";
import {nanoid} from "nanoid";
import {decode} from "html-entities";

export default function Quiz(props) {
	const {question, correct_answer, incorrect_answers, ansStatus, updateAnsStatus, id} = props;
	// combine two 1D arrays into a 2D array
	let [choices, setChoices] = useState(() =>
		[correct_answer, ...incorrect_answers]
			.map((value, i) => ({
				text: value,
				correct: [true, false, false, false][i],
				selected: false,
				id: nanoid(),
			}))
			.sort(() => Math.random() - 0.5)
	);

	function toggleSelect(selectedId) {
		setChoices(oldChoices =>
			oldChoices.map(obj =>
				selectedId === obj.id
					? {...obj, selected: !obj.selected}
					: {...obj, selected: false}
			)
		);
	}

	let choiceDivs = choices.map(c => (
		<Choice
			text={c.text}
			correct={c.correct}
			selected={c.selected}
			key={c.id}
			id={c.id}
			toggleSelect={toggleSelect}
			updateAnsStatus={updateAnsStatus}
			quizId={id}
		/>
	));

	return (
		<article className="quiz">
			<h2>
				{decode(question)} {ansStatus ? "✅" : "❌"}
			</h2>
			<div className="choices">{choiceDivs}</div>
			{/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
			{/* <pre>{JSON.stringify(choices, null, 4)}</pre> */}
			<hr />
		</article>
	);
}
