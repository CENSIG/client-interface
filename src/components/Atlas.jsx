import React						 from "react";
import TaxonStore				 from "../stores/TaxonStore";
import ApplicationStore	 from "../stores/ApplicationStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";

if (process.env.BROWSER && typeof window !== "undefined") {
	var BaseMap = require("./BaseMap");
}

class Atlas extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	render() {
		var map;
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap />
		}
		return (
			<div>	
				<header>
					<h1>Bienvenue sur l'atlas des {this.props.nom}</h1>
					<h3>({this.props.nomVern})</h3>
				</header>
				<PanelInformations />
				{map}
			</div>
		)	
	}
}

Atlas = connectToStores(Atlas, [ TaxonStore ], (stores, props) => {
	return {
		nom     : stores.TaxonStore.getInfo().nom,
		nomVern : stores.TaxonStore.getInfo().nomVern
	}
});

export default Atlas;

