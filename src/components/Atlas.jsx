import React						 from "react";
import AtlasStore				 from "../stores/AtlasStore";
import AtlasAction			 from "../actions/AtlasAction";
import ApplicationStore	 from "../stores/ApplicationStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";
import Ariane						 from "./Ariane";
import Header						 from "./Header";
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
				<Header>
					<h1>Bienvenue sur l'atlas des {this.props.info.nom}</h1>
				</Header>
				<Search 
					label={this.props.info.nom} 
					parentsCdnom={this.props.info.id}
				/>
				<section className="flex fdrr fjb">
					<PanelInformations info={this.props.info} />
					{map}
				</section>
			</article>
		)	
	}
}

Atlas = connectToStores(Atlas, [ AtlasStore ], (stores, props) => {
	return stores.AtlasStore.getState();
});

export default Atlas;

