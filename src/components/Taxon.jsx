import React							from "react";
import TaxonStore					from "../stores/TaxonStore";
import AtlasStore					from "../stores/AtlasStore";
import BrothersNavigationStore from "../stores/BrothersNavigationStore";
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
				<Header className="flex fdc">
					<div className="flex fjb">
						<h1>{info.get("nom")}</h1>
						<Ariane parents={parents} />
					</div>
					<BrothersNavigation 
						brothers={this.props.taxon.brothers}
						left={this.props.brothersNav.left}
						right={this.props.brothersNav.right}
					/>
				</Header>
				<Search 
					label={searchLabel} 
					parentsCdnom={parentsCdnom}
				/>
				<section className="flex fdrr fjb">
					<PanelInformations info={info} />
					{map}
				</section>
			</article>
		);	
	}
}

Taxon = connectToStores(Taxon, [ TaxonStore, AtlasStore, BrothersNavigationStore], (stores, props) => {
	return {
		taxon        : stores.TaxonStore.getState(),
		atlasUriName : stores.AtlasStore.getUriName(),
		brothersNav  : stores.BrothersNavigationStore.getState()
	}
});

export default Taxon;
