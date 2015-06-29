import React from "react";
import Radium from "radium";
import ArianeItem from "./ArianeItem";
import {base} from "../style";

/**
 * Breadcrumb
 * @author Jean BOUDET
 */
class Ariane extends React.Component
{
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.parents !== this.props.parents;	
	}

	_createItems() {
		var n            = this.props.parents.size;
		var atlasUriName = this.context.atlasUriName;
		var withLink     = this.props.withLink;
		return this.props.parents.map((parent, i) => {
			var res;
			var params = {name: atlasUriName, cdnom: parent.get("cdnom")};
			switch (i) {
				case 0:
					res = (
						<ArianeItem key={i} route="atlas" withLink={withLink}
							navParams={params}>
							{parent.get("name")}
						</ArianeItem>
					);
					break;
				case n - 1:
					res = (
						<ArianeItem key={i} route="taxon" isLast={true} withLink={withLink}
							navParams={params}>
							{parent.get("name")}
						</ArianeItem>
					);
					break;
				default:
					res = (
						<ArianeItem key={i} route="taxon" withLink={withLink} 
							navParams={params}>
							{parent.get("name")}
						</ArianeItem>
					);
					break;
			}
			return res; 
		});
	}

	render() {
		var items = this._createItems();
		return (
			<div style={base}>
				{items}	
			</div>
		);	
	}
}

Ariane.defaultProps = {
	style: base
}

Ariane.contextTypes = {
	atlasUriName: React.PropTypes.string
}

Ariane = Radium(Ariane);

export default Ariane;
