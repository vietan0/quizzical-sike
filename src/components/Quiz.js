import React from "react";
import Choice from "./Choice";
import {decode} from "html-entities";

export default function Quiz(props) {
	const {question, choices, toggleSelect, ansStatus, updateAnsStatus, id} = props;

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
		/>
	));

	return (
		<article className="quiz">
			<h2>
				{decode(question)} {ansStatus ? "✅" : "❌"}
			</h2>
			<div className="choices">{choiceDivs}</div>
			{/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
			<hr />
		</article>
	);
}
