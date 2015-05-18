import React						 from "react";
import TaxonStore				 from "../stores/TaxonStore";
import ApplicationStore	 from "../stores/ApplicationStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";
import Ariane						 from "./Ariane";
import Search						 from "./Search";
import {base}						 from "../configs/themesForMap";

// if application is in browser then require BaseMap
if (process.env.BROWSER && typeof window !== "undefined") {
	require("../assets/css/base/atlas.css");
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
			<article className="atlas">	
				<header className="flex fjb fac">
					<h1>Bienvenue sur l'atlas des {this.props.info.nom}</h1>
					<Ariane parents={this.props.parents} />
				</header>
				<Search label={this.props.info.nom} />
				<section className="flex fdrr fjb">
					<PanelInformations info={this.props.info} />
					{map}
				</section>
			</article>
		)	
	}
}

Atlas = connectToStores(Atlas, [ TaxonStore ], (stores, props) => {
	return {
		info    : stores.TaxonStore.getInfo(),
		geojson : stores.TaxonStore.getGeoJson(),
		parents : stores.TaxonStore.getParents()
	}
});

export default Atlas;

