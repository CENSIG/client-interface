import React						 from "react";
import TaxonStore				 from "../stores/TaxonStore";
import {connectToStores} from "fluxible/addons";

class Taxon extends React.Component
{
	constructor(props, context) {
		super(props);
		this.state = context.getStore(TaxonStore).getState();
	}

	componentDidMount() {
		this.context.getStore(TaxonStore).addChangeListener(this._onChange.bind(this));	
	}

	_onChange() {
		this.setState(this.context.getStore(TaxonStore).getState());
	}

	render() {
		return (
			<div>
				<p>Bienvenue dans l'atlas {this.state.info.name}</p>
			</div>	
		);
	}
}

Taxon.contextTypes = {
	getStore: React.PropTypes.func
}

export default Taxon;
