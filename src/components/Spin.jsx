import React from "react";

if (process.env.BROWSER) {
	var Spinner = require("react-spinkit");
}

class Spin extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="spin flex fjc fac">
				<Spinner spinnerName={this.props.name} />
			</div>
		)	
	}
}

export default Spin;
