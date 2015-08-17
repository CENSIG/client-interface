import React from "react";

import style from "./styles/topNavStyle";

class TopNavBar extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		return (
			<nav style={style.topnav}>
				{props.children}	
			</nav>
		);	
	}
}

export default TopNavBar;
