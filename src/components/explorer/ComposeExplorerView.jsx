import React from "react";
import {NavLink} from "fluxible-router";

import {ButtonExplorerView} from "client-interface-components/lib/explorer";

// Label for button explorer view
const labelMap = {
	"FM": "Voir les genres",
	"GN": "Voir les espèces",
	"ES": "Voir les sous-espèces"
};

/**
 * Compose component for explorer view
 * @author Jean BOUDET
 */
class ComposeExplorerView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		let label = labelMap[props.rang] || "Voir les taxons inférieurs";
		return (
			<li style={props.styleViewLi}>
				<NavLink routeName="taxon" navParams={{
					name: this.context.atlasUriName,
					cdnom: props.cdnom
				}}>
					<span style={props.styleViewLiFirst}>
						{props.name}						
					</span>
				</NavLink>
				<ButtonExplorerView cdnom={props.cdnom}>
					{label}
				</ButtonExplorerView>
			</li>
		);	
	}
}

ComposeExplorerView.contextTypes = {
	atlasUriName: React.PropTypes.string
};

export default ComposeExplorerView;
