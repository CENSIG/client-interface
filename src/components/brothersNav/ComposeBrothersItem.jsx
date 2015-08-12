import React from "react";
import {NavLink} from "fluxible-router";

/**
 * Compose component for brothers navigation item
 * @author Jean BOUDET
 */
class ComposeBrothersItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		let navParams = {
			name: this.context.atlasUriName,
			cdnom: props.id
		};
		return (
			<NavLink routeName="taxon" navParams={navParams}>
				{props.children}	
			</NavLink>
		);	
	}
}

ComposeBrothersItem.contextTypes = {
	atlasUriName: React.PropTypes.string
}

export default ComposeBrothersItem;
