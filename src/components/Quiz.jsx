import React from "react";
import Choice from "./Choice";
import {decode} from "html-entities";

export default function Quiz(props) {
	const {question, choices, toggleSelect, index, ansStatus, updateAnsStatus, id, submitted} = props;

	let choiceDivs = choices.choicesArr.map(c => (
		<Choice
			text={c.text}
			correct={c.correct}
			selected={c.selected}
			key={c.id}
			id={c.id}
			toggleSelect={toggleSelect}
			updateAnsStatus={updateAnsStatus}
			quizId={id}
			submitted={submitted}
		/>
	));

	return (
		<article className="quiz">
			<h2 className="index">{index + 1}.</h2>
			<h2>{decode(question)}</h2>
			<div className="choices">{choiceDivs}</div>
			<hr />
		</article>
	);
}
