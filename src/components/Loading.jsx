import React from "react";
import Spinner from "react-spinkit";

var divStyle = {
	position: "absolute",
	display:  "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	top: 0,
	right: 0,
	bottom: 0,
	left:0
};

class Loading extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={divStyle}>	
				<p>Chargement des données...</p>
				<Spinner spinnerName="rotating-plane" />
			</div>
		)	
	}
}

export default Loading
