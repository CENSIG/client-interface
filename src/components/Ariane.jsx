import React from "react";
import {NavLink} from "fluxible-router";

if (process.env.BROWSER) {
	require('../assets/css/base/ariane.css');
}

/**
 * Last item for breadcrumb
 * @author Jean BOUDET
 */
class ArianeItemLast extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
	}

	render() {
		return (
			<NavLink routeName={this.props.route} navParams={this.props.navParams}>
				<span className="ariane-item-last">
					<strong>{this.props.children}</strong>
				</span>
			</NavLink>
		);		
	}
}
	
/**
 * Item for breadcrumb
 * @author Jean BOUDET
 */
class ArianeItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
	}

	render() {
		return (
			<NavLink routeName={this.props.route} navParams={this.props.navParams}>
				<span className="ariane-item">
					{this.props.children}
				</span>
			</NavLink>
		);	
	}
}

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

	render() {
		var n            = this.props.parents.size;
		var atlasUriName = this.context.atlasUriName;
		var items        = this.props.parents.map((parent, i) => {
			var res;
			switch (i) {
				case 0:
					res = (
						<ArianeItem route="atlas" navParams={{name: atlasUriName}}>
							{parent.get("name")}
						</ArianeItem>
					);
					break;
				case n - 1:
					res = (
						<ArianeItemLast route="taxon" 
							navParams={{name: atlasUriName, cdnom: parent.get("cdnom")}}>
							{parent.get("name")}
						</ArianeItemLast>
					);
					break;
				default:
					res = (
						<ArianeItem route="taxon" 
							navParams={{name: atlasUriName, cdnom: parent.get("cdnom")}}>
							{parent.get("name")}
						</ArianeItem>
					);
					break;
			}
			return res; 
		}.bind(this));

		return (
			<div className="ariane">
				{items}	
			</div>
		);	
	}
}

Ariane.contextTypes = {
	atlasUriName: React.PropTypes.string
}

export default Ariane;
