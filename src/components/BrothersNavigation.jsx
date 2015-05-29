import React from "react";

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
			<li className={this.props.className}>
				{this.props.children}
			</li>
		)	
	}
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

	render() {
		var leftName, rightName;

		if (this.props.brothers.size !== 0) {
			leftName = this.props.brothers.get(this.props.left).get("name");
			rightName = this.props.brothers.get(this.props.right).get("name");
		}

		return (
			<nav>
				<ul className="brothers-navigation flex fjc">
					<ItemBrothersNavigation className="brothers-left">
						{leftName}
					</ItemBrothersNavigation>
					<ItemBrothersNavigation className="brothers-right">
						{rightName}
					</ItemBrothersNavigation>
				</ul>
			</nav>
		);	
	}
}

export default BrothersNavigation;
