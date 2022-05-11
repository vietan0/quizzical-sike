export default function unEscape(str) {
	const CONVERT_TABLE = {
		"&#039;": "'",
		"&quot;": '"',
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&ldquo;": "“",
		"&rdquo;": "”",
		"&lsquo;": "‘",
		"&rdquo;": "’",
		"&hellip;": "…",
	};
	let matches = str.match(/&[\S]{2,6}?;/g);
	if (!matches) return str;
	for (let i = 0; i < matches.length; i++) {
		str = str.replace(matches[i], CONVERT_TABLE[matches[i]]);
	}
	return str;
}
