import React from "react";
import BrothersNavigationStore from "../stores/BrothersNavigationStore";
import {connectToStores}  from "fluxible/addons";
import {BrothersNavigation} from "client-interface-components";

class BaseBrothersNav extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<div>
				<BrothersNavigation
					brothers={this.props.brothers}
					left={this.props.left}
					right={this.props.right}
				/>
			</div>
		);	
	}
}

BaseBrothersNav = connectToStores(BaseBrothersNav, [ BrothersNavigationStore ], (context, props) => {
	return context.getStore(BrothersNavigationStore).getState();
});

export default BaseBrothersNav;
