import React from "react";

export default function Choice(props) {
	return (
		<div
			onClick={() => props.toggleSelect(props.id)}
			className={`${props.selected ? "selected" : ""}`}
		>
			{props.unEscape(props.text)} {props.correct && `- the correct one`}
		</div>
	);
}
