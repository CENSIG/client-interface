import React from "react";
import Radium from "radium";
import ItemBrothersNavigation from "./ItemBrothersNavigation";

import style from "../style";

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
							right={false}
							style={style.left}
							cdnom={leftBrother.get("cdnom")}>
							{leftBrother.get("name")}
						</ItemBrothersNavigation>

						<ItemBrothersNavigation 
							right={true}
							style={style.right}
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
