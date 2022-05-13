import React from "react";
import {decode} from "html-entities";

export default function Choice(props) {
	const {text, correct, selected, id, toggleSelect, updateAnsStatus, quizId} = props;
	return (
		<div
			onClick={() => {
				toggleSelect(id);
				{correct && updateAnsStatus(quizId);};
			}}
			className={`${selected ? "selected" : ""}`}
		>
			{decode(text)}
		</div>
	);
}
