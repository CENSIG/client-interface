export default {
	sidebar: {
		background: "#fff",
		border: "1px solid #e7e7e7",
		height: "100%",
		position: "fixed",
		width: 150,
		transition:"transform 0.5s",
		"@media (max-width: 780px)": {
			transform: "translateX(-150px)"
		}
	},

	sidebarOn: {
		"@media (max-width: 780px)": {
			transform: "none"
		}
	},

	sidebarOff: {
		"@media (max-width: 780px)": {
			transform: "translateX(-150px)"
		}
	}
};
