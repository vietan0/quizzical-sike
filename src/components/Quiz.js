import React from "react";
import Option from "./Option";

export default function Quiz(props) {
	// let [options, setOptions] = React.useState(
	// 	// new Array(4).fill(0).map(n => <Option />)
	// 	{}
	// );

	return (
		<div className="quiz">
			<h3>{props.question}</h3>
			<div className="options">
				<Option text={props.correct_answer}/>
				<Option text={props.incorrect_answers[0]}/>
				<Option text={props.incorrect_answers[1]}/>
				<Option text={props.incorrect_answers[2]}/>
			</div>
			<hr />
		</div>
	);
}
