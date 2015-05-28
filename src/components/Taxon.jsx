import React							from "react";
import TaxonStore					from "../stores/TaxonStore";
import AtlasStore					from "../stores/AtlasStore";
import {connectToStores}  from "fluxible/addons";
import PanelInformations  from "./PanelInformations";
import Ariane						  from "./Ariane";
import Header						  from "./Header";
import Search						  from "./Search";
import BrothersNavigation from "./BrothersNavigation";
import {base}						  from "../configs/themesForMap";

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

	shouldComponentUpdate(nextProps) {
		return nextProps.taxon.info.get("id") !== this.props.taxon.info.get("id");
	}

	render() {
		var map;
		var parents = this.props.taxon.parents;
		var geojson = this.props.taxon.geojson;
		var info		= this.props.taxon.info;

		// if application is in browser then display BaseMap
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap 
				geojson={geojson} 
				theme={base} 
			/>
		}

		// It's the atlas taxon
		var firstParents = parents.first();
		var searchLabel  = (parents.size > 0) ? firstParents.get("name")  : "";
		var parentsCdnom = (parents.size > 0) ? firstParents.get("cdnom") : "";

		return (
			<article className="atlas">	
				<Header>
					<h1>{info.get("nom")}</h1>
					<Ariane parents={parents} />
				</Header>
				<Search 
					atlasUriName={this.props.atlasUriName}
					label={searchLabel} 
					parentsCdnom={parentsCdnom}
				/>
				<BrothersNavigation 
					brothers={this.props.taxon.brothers}
					currentCdnom={info.id}
				/>
				<section className="flex fdrr fjb">
					<PanelInformations info={info} />
					{map}
				</section>
			</article>
		);	
	}
}

Taxon = connectToStores(Taxon, [ TaxonStore, AtlasStore ], (stores, props) => {
	return {
		taxon        : stores.TaxonStore.getState(),
		atlasUriName : stores.AtlasStore.getUriName()
	}
});

export default Taxon;
