import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import Radium from "radium";

import style from "./styles/asideNavStyle";

class AsideNav extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		let props = this.props;
		let	display = (props.displayAside) ? style.sidebarOn : style.sidebarOff;	
		return (
			<div style={[style.sidebar, display]}>
				<ul>
					{props.children}		
				</ul>
			</div>
		);	
	}
}

export default Radium(AsideNav);
