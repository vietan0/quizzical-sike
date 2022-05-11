import React from "react";

export default function App() {
	let numDivs = new Array(15).fill(0).map((_, i) => <div>Item {i + 1}</div>);
	return (
		<>
			<h1>App Banana goes here</h1>
			<h2>One banana two bananas</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores temporibus dolores
				atque sint quaerat dolore natus tempore et, voluptatibus, nobis fugit. Inventore ut
				deleniti quod. Delectus quam praesentium laboriosam, perspiciatis rerum, hic nam
				consequuntur voluptatem similique vel eum dolor sunt neque et magni maiores?
			</p>
			<div className="flex-container">{numDivs}</div>
		</>
	);
}
