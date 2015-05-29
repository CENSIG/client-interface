import React from "react";

/**
 * A simple component for header
 * @author Jean BOUDET
 */
class Header extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<header className={this.props.className}>	
				{this.props.children}
			</header>
		);	
	}
}

export default Header;
