import React from "react";
import Option from "./Option";

export default function Quiz(props) {
	// let [options, setOptions] = React.useState(
	// 	// new Array(4).fill(0).map(n => <Option />)
	// 	{}
	// );

	return (
		<article className="quiz">
			<h2>{props.question}</h2>
			<div className="options">
				<Option text={props.correct_answer}/>
				<Option text={props.incorrect_answers[0]}/>
				<Option text={props.incorrect_answers[1]}/>
				<Option text={props.incorrect_answers[2]}/>
			</div>
			<hr />
		</article>
	);
}
