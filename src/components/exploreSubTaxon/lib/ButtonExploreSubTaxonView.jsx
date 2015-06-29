import React from "react";

/**
 * Button explore sub taxon.
 * @author Jean BOUDET
 */
class ButtonExploreSubTaxonView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<span data-cdnom={this.props.cdnom} 
				onClick={this.context.subTaxonViewCallback}>Explorer les fils</span>);
	}
}

ButtonExploreSubTaxonView.contextTypes = {
	subTaxonViewCallback: React.PropTypes.func
}

export default ButtonExploreSubTaxonView;
