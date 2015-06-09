import React from "react";
import {NavLink} from "fluxible-router";

if (process.env.BROWSER && typeof window !== "undefined") {
	require("../assets/css/base/brothersNavigation.css");
}
	
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

	render() {
		return (
			<NavLink routeName="taxon" 
				navParams={{name: this.context.atlasUriName, cdnom: this.props.cdnom}}>
					<li className={this.props.className}>
						{this.props.children}
					</li>
			</NavLink>
		)	
	}
}

ItemBrothersNavigation.contextTypes = {
	atlasUriName: React.PropTypes.string
}

/**
 * A component which represent brothers navigation
 * @author Jean BOUDET
 */
class BrothersNavigation extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.brothers !== this.props.brothers;	
	}

	render() {
		var leftBrother, rightBrother;

		if (this.props.brothers.size !== 0) {
			leftBrother   = this.props.brothers.get(this.props.left);
			rightBrother  = this.props.brothers.get(this.props.right);

			return (
				<nav>
					<ul className="brothers-navigation flex fjc">
						<ItemBrothersNavigation 
							className="brothers-left"
							cdnom={leftBrother.get("cdnom")}>
							{leftBrother.get("name")}
						</ItemBrothersNavigation>

						<ItemBrothersNavigation 
							className="brothers-right"
							cdnom={rightBrother.get("cdnom")}>
							{rightBrother.get("name")}
						</ItemBrothersNavigation>
					</ul>
				</nav>
			);
		}
		return null;
	}
}

export default BrothersNavigation;
