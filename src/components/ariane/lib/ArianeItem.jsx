import React from "react";
import Radium from "radium";
import {NavLink} from "fluxible-router";
import {arrow} from "../style";

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

	/*shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
	}*/

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
			<span data-cdnom={this.props.navParams.cdnom} className="pointer ariane-item" onClick={this.context.arianeCallback}>
				<span>{this._isLast()}</span>
				<span style={arrow}></span>
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
				<span style={arrow}></span>
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
// from ExploreSubTaxon component for example
ArianeItem.contextTypes = {
	arianeCallback: React.PropTypes.func
}

ArianeItem = Radium(ArianeItem);

export default ArianeItem;
