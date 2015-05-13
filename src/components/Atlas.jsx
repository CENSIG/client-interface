import React						 from "react";
import TaxonStore				 from "../stores/TaxonStore";
import ApplicationStore	 from "../stores/ApplicationStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";
import {base}						 from "../configs/themesForMap";

// if application is in browser then require BaseMap
if (process.env.BROWSER && typeof window !== "undefined") {
	var BaseMap = require("./map/BaseMap");
}

/**
 * A component for Atlas
 * @author Jean BOUDET
 */
class Atlas extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	render() {
		var map;
		// if application is in browser then display BaseMap
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap 
				geojson={this.props.geojson} 
				theme={base} 
			/>
		}

		return (
			<div>	
				<header>
					<h1>Bienvenue sur l'atlas des {this.props.info.nom}</h1>
					<h3>({this.props.info.nomVern})</h3>
				</header>
				<PanelInformations info={this.props.info} />
				{map}
			</div>
		)	
	}
}

Atlas = connectToStores(Atlas, [ TaxonStore ], (stores, props) => {
	return {
		info: stores.TaxonStore.getInfo(),
		geojson: stores.TaxonStore.getGeoJson()
	}
});

export default Atlas;

