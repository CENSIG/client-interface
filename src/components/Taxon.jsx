import React      from "react";
import TaxonStore	from "../stores/TaxonStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";
import Ariane						 from "./Ariane";
import Header						 from "./Header";
import Search						 from "./Search";
import {base}						 from "../configs/themesForMap";

if (process.env.BROWSER && typeof window !== "undefined") {
	var BaseMap = require("./map/BaseMap");
}

/**
 * A component to display a taxon of atlas
 * @author Jean BOUDET
 */
class Taxon extends React.Component
{
	constructor(props) {
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

		var parents      = this.props.parents;
		var searchLabel  = (parents.length > 0) ? parents[0].name  : "";
		var parentsCdnom = (parents.length > 0) ? parents[0].cdnom : "";

		return (
			<article className="atlas">	
				<Header>
					<h1>{this.props.info.nom}</h1>
					<Ariane parents={this.props.parents} />
				</Header>
				<Search 
					label={searchLabel} 
					parentsCdnom={parentsCdnom}
				/>
				<section className="flex fdrr fjb">
					<PanelInformations info={this.props.info} />
					{map}
				</section>
			</article>
		);	
	}
}

Taxon = connectToStores(Taxon, [ TaxonStore ], (stores, props) => {
	return stores.TaxonStore.getState();
});

export default Taxon;
