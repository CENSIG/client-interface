import React from "react";
import Radium from "radium";

import style from "./styles/contentStyle";

class Content extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		return (
			<div style={[style.content, style.responsive]}>
				{props.children}	
			</div>
		);	
	}
}

export default Radium(Content);
