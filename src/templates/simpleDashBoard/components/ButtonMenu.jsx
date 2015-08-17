import React from "react";
import Radium from "radium";

import buttonMenuStyle from "./styles/buttonMenuStyle";

class ButtonMenu extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		return (
			<div style={buttonMenuStyle.container}>
				<span 
					style={buttonMenuStyle.button}
					onClick={props._onClick}
				>Menu
				</span>
			</div>
		);	
	}
}

export default Radium(ButtonMenu);
