import React						 from "react";
import TaxonStore				 from "../stores/TaxonStore";
import {connectToStores} from "fluxible/addons";

class Taxon extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Bienvenue dans l'atlas {this.props.info.nom}</p>
				<p>Geojson: {this.props.geojson.type}</p>
			</div>	
		);
	}
}

Taxon = connectToStores(Taxon, [ TaxonStore ], (stores, props) => {
	return stores.TaxonStore.getState();	
});

Taxon.contextTypes = {
	getStore: React.PropTypes.func
}

export default Taxon;
