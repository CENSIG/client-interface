import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import BrothersNavigationStore from "../../stores/BrothersNavigationStore";
import {connectToStores}  from "fluxible/addons";
import {BrothersNavigation} from "client-interface-components";

import ComposeBrothersItem from "./ComposeBrothersItem";

/**
 * Component for display brothers navigation
 * @author Jean BOUDET
 */
class BaseBrothersNav extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return (
			<BrothersNavigation
				brothers={this.props.brothers}
				left={this.props.left}
				right={this.props.right}
				withCompose={ComposeBrothersItem}
			/>
		);	
	}
}

BaseBrothersNav = connectToStores(BaseBrothersNav, [ BrothersNavigationStore ], (context, props) => {
	return context.getStore(BrothersNavigationStore).getState();
});

export default BaseBrothersNav;
