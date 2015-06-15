import React from "react";
import {NavLink} from "fluxible-router";

if (process.env.BROWSER) {
	require('../assets/css/base/ariane.css');
}

/**
 * Item for breadcrumb
 * @author Jean BOUDET
 */
class ArianeItem extends React.Component
{
	constructor(props) {
		super(props);	
		this.defaultProps = {
			withLink: false,
			isLast: false
		}
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
	}

	/**
	 * Is last item ?
	 * If last return strong element
	 */
	_isLast() {
		return (this.props.isLast) 
			? <strong>{this.props.children}</strong>
			: this.props.children;
	}

	/**
	 * Item with no link (a element)
	 */
	_withNoLink() {
		return (
			<span data-cdnom={this.props.navParams.cdnom} className="ariane-item" onClick={this.context.arianeCallback}>
				{this._isLast()}
			</span>
		);
	}

	/**
	 * Item with link (a element)
	 */
	_withLink() {
		return (
			<NavLink routeName={this.props.route} navParams={this.props.navParams}>
				<span className="ariane-item">
					{this._isLast()}
				</span>
			</NavLink>
		);
	}

	render() {
		if (this.props.withLink) {
			return this._withLink();
		}
		return this._withNoLink();
	}
}

// For execute special callBack 
// from ExploreSubTaxon component
ArianeItem.contextTypes = {
	arianeCallback: React.PropTypes.func
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
