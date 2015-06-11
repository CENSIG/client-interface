import React from "react";

if (process.env.BROWSER) {
	require('../assets/css/base/exploreSubTaxon.css');
}

export class ButtonExploreSubTaxon extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render () {
		if (this.props.hasFirstChilds) {
			return (
				<span className="button-explore">Explorer</span>	
			);
		} 
		return null;	
	}
}

export class ExploreSubTaxon extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return;
	}
}
