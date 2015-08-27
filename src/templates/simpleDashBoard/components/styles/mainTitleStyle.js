export default {
	base: {
		color: "#aeaeae",
		"@media (min-width: 780px)": {
			margin: "10px 15px 0 15px"	
		},

		"@media (max-width: 780px)": {
			display: "inline-block",
			textAlign: "right",
			width: "90%"
		}
	},

	firstTitle: {
		fontSize: "1.2em"
	},
	
	smallTitle: {
		display: "block",
		whiteSpace: "nowrap",
		"@media (max-width: 780px)": {
			display: "none"
		}
	}
};
