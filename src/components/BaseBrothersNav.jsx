import React from "react";
import BrothersNavigationStore from "../stores/BrothersNavigationStore";
import {connectToStores}  from "fluxible/addons";
import {BrothersNavigation} from "client-interface-components";

class BaseBrtohersNav extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<div style={{alignSelf: "center"}}>
				<BrothersNavigation
					brothers={this.props.brothers}
					left={this.props.left}
					right={this.props.right}
				/>
			</div>
		);	
	}
}

BaseBrtohersNav = connectToStores(BaseBrtohersNav, [ BrothersNavigationStore ], (stores, props) => {
	return stores.BrothersNavigationStore.getState();
});

export default BaseBrtohersNav;
