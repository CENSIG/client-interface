import React from "react";
import {NavLink} from "fluxible-router";

import style from "../style";
/**
 * A component which represent item of brothers
 * navigation
 * @author Jean BOUDET
 */
class ItemBrothersNavigation extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.children !== this.props.children;	
	}

	_right() {
		return (
			<NavLink routeName="taxon" 
				navParams={{name: this.context.atlasUriName, cdnom: this.props.cdnom}}>
					<span>{this.props.children}</span>
					<span style={this.props.style}></span>
			</NavLink>
		);
	}

	_left() {
		return (
			<NavLink routeName="taxon" 
				navParams={{name: this.context.atlasUriName, cdnom: this.props.cdnom}}>
					<span style={this.props.style}></span>
					<span>{this.props.children}</span>
			</NavLink>
		);	
	}

	render() {
		var item = (this.props.right) ? this._right() : this._left();
		return (
			<li style={style.item}>
				{item}
			</li>
		)	
	}
}

ItemBrothersNavigation.contextTypes = {
	atlasUriName: React.PropTypes.string
}

export default ItemBrothersNavigation;
