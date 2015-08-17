const borderColorArrow = "#818181";
const borderArrow = `1px solid ${borderColorArrow}`;

export default {
	figure: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap"
	},

	img: {
		margin: "0 10px 0 0"	
	},

	arrowHidden: {
		display: "none"
	},

	responsive: {
		"@media (max-width: 800px)": {
			display: "none"	
		}
	},

	textArrow: {
		display: "block",
		whiteSpace: "nowrap",
		textIndent: "100%",
		overflow: "hidden"
	},

	arrowRight: {
		borderTop: borderArrow,
		borderRight: borderArrow, 
		width: 20,
		height:20,
		cursor: "pointer",
		transform: "rotate(45deg)"
	},

	arrowLeft: {
		borderTop: borderArrow,
		borderLeft: borderArrow, 
		width: 20,
		height:20,
		cursor: "pointer",
		transform: "rotate(-45deg)"
	}
}
