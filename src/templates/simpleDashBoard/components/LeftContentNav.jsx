import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Radium from "radium";

import leftContentStyle from "./styles/leftContentStyle";

class LeftContentNav extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		let props = this.props;
		let leftStyle = (props.hasRight)
			? leftContentStyle.withRight
			: leftContentStyle.def
		return (
			<div style={[leftStyle, leftContentStyle.responsive]}>
				{props.children}
			</div>
		);			
	}
}

export default Radium(LeftContentNav);
