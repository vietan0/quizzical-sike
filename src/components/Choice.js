import React from "react";
import {decode} from "html-entities";

export default function Choice(props) {
	const {text, correct, selected, id, toggleSelect, updateAnsStatus, quizId, submitted} = props;
	return (
		<div
			onClick={() => {
				toggleSelect(quizId, id);
				updateAnsStatus(quizId, correct, selected);
			}}
			className={`
				${selected ? "selected" : ""}
				${submitted ? "submitted" : ""}
				${
					submitted
						? correct
							? selected
								? "correct"
								: "missed"
							: selected
							? "wrong"
							: "not-selected"
						: ""
				}
			`}
		>
			{decode(text)}
		</div>
	);
}
