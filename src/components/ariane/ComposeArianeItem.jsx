import React from "react";
import {NavLink} from "fluxible-router";

/**
 * Compose component for ariane item
 * @author Jean BOUDET
 */
class ComposeArianeItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let {position, ...props} = this.props;
		let atlasUriName = this.context.atlasUriName;

		let routeName = position === 0 ? "atlas" : "taxon";
		let navParams = position === 0
			? { name: atlasUriName }
			: { name: atlasUriName, cdnom: props.id }
		return (
			<NavLink routeName={routeName} navParams={navParams}>
				{props.children}
			</NavLink>
		);	
	}
}

ComposeArianeItem.contextTypes = {
	atlasUriName: React.PropTypes.string
};

export default ComposeArianeItem;
