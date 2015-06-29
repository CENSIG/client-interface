import React from "react";

/**
 * Button explore. Display list of taxon childs
 * @author Jean BOUDET
 */
class ButtonExploreSubTaxon extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render () {
		return (
			<span onClick={this.props.callBackClick}>Explorer</span>	
		);
	}
}

export default ButtonExploreSubTaxon;
