import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";

import TopNavBar from "./TopNavBar";
import AsideNav from "./AsideNav";
import ButtonMenu from "./ButtonMenu";
import LeftContentNav from "./LeftContentNav";

class NavBarWrapper extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			displayAside: false	
		};
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	_handleMenuClick(e) {
		let displayAside = this.state.displayAside;
		this.setState({displayAside: !displayAside});
	}

	render() {
		let props = this.props;
		return (
			<TopNavBar>
				<LeftContentNav hasRight={props.right !== null}>
					<ButtonMenu _onClick={this._handleMenuClick.bind(this)} />
					{props.title}
				</LeftContentNav>
				{props.right}
				<AsideNav displayAside={this.state.displayAside}>
					{props.children}
				</AsideNav>
			</TopNavBar>
		);
	}
}

export default NavBarWrapper;
