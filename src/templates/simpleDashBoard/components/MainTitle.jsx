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
		let {base, firstTitle, smallTitle} = style;
		return (
			<div style={base}>
				<h1 ref="firstTitle" style={firstTitle}>{props.firstTitle}</h1>
				<h4 ref="smallTitle" style={smallTitle}>{props.smallTitle}</h4>
			</div>
		);	
	}
}

export default Radium(MainTitle);
