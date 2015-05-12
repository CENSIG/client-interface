import React						 from "react";
import TaxonStore				 from "../stores/TaxonStore";
import {connectToStores} from "fluxible/addons";

class PanelInformations extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
					<li>Nom: {this.props.nom}</li>
					<li>Phylum: {this.props.phylum}</li>
					<li>Classe: {this.props.classe}</li>
					<li>Nombre d'observations: {this.props.observations}</li>
					<li>Nombre d'especes: {this.props.especes}</li>
					<li>Nombre de communes: {this.props.communes}</li>
				</ul>
			</div>
		);
	}
}

PanelInformations = connectToStores(PanelInformations, [ TaxonStore ], (stores, props) => {
	return stores.TaxonStore.getInfo();
});

export default PanelInformations;


