import React from "react";

class Header extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<header className="flex fjb fac">	
				{this.props.children}
			</header>
		);	
	}
}

export default Header;
