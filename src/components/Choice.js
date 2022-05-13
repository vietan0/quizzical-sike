import React from "react";
import unEscape from "../unEscape";

export default function Choice(props) {
	return (
		<div
			onClick={() => props.toggleSelect(props.id)}
			className={`${props.selected ? "selected" : ""}`}
		>
			{unEscape(props.text)} {props.correct && `💎`}
		</div>
	);
}
