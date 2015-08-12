import React from "react";
import {NavLink} from "fluxible-router";

import {ItemContentName} from "client-interface-components/lib/search";

/**
 * Compose component for result content
 * @author Jean BOUDET
 */
class ComposeSearchResultContent extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let {children, styleUl, styleLi} = this.props;
		let navParams = {
			name: this.context.atlasUriName,
			cdnom: children.get("cdnom")
		};
		return (
			<NavLink routeName="taxon" navParams={navParams}>
				<ul style={styleUl}>
					<li style={styleLi}>
						<em><strong>{children.get("nameRef")}</strong></em>
					</li>
					<ItemContentName isref={children.get("isref")}>
						{children.get("name")}
					</ItemContentName>
				</ul>
			</NavLink>
		);	
	}
}

ComposeSearchResultContent.contextTypes = {
	atlasUriName: React.PropTypes.string
};

export default ComposeSearchResultContent;
