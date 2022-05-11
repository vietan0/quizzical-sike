import React from "react";
import Choice from "./Choice";

export default function Quiz(props) {

	return (
		<article className="quiz">
			<pre>{JSON.stringify(props, null, 4)}</pre>
			<h2>{props.question}</h2>
			<div className="options">
				<Choice text={props.correct_answer}/>
				<Choice text={props.incorrect_answers[0]}/>
				<Choice text={props.incorrect_answers[1]}/>
				<Choice text={props.incorrect_answers[2]}/>
			</div>
			<hr />
		</article>
	);
}
