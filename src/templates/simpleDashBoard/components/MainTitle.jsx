import React from "react";
import Radium from "radium";

import style from "./styles/mainTitleStyle";

class MainTitle extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		return (
			<h1 style={style}>{props.children}</h1>
		);	
	}
}

export default Radium(MainTitle);
