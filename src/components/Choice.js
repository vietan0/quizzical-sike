import React from "react";
import {decode} from "html-entities";

export default function Choice(props) {
	return (
		<div
			onClick={() => props.toggleSelect(props.id)}
			className={`${props.selected ? "selected" : ""}`}
		>
			{decode(props.text)} {props.correct && `💎`}
		</div>
	);
}
