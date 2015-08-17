export default {

	divContainer: {
		position: "fixed",
		width: "500px",
		"@media (max-width: 780px)": {
			width: "100%"	
		}
	},

	divInput: {
		width   : 120
	},

	divInputActive: {
		boxShadow: "0 2px 5px rgba(0, 0, 0, 0.26)",
		width: "100%"
	},

	ulResults: {
		background: "#fff",
		margin: "4px 0 0 0",
		padding: 10,
		position: "absolute",
		maxHeight: 400,
		width: "100%",
		overflowY: "scroll",
		zIndex: 1100
	}
}
