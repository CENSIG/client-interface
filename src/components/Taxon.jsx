import React							from "react";
import {BarChart}				  from "react-d3/barchart"
import TaxonStore					from "../stores/TaxonStore";
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
		if (this.props.taxon.current === null) {
			return true;	
		}
		return nextProps.taxon.current !== this.props.taxon.current;
	}

	render() {
		var map, chart;
		var parents     = this.props.taxon.parents;
		var geojson     = this.props.taxon.geojson;
		var info        = this.props.taxon.info;
		var firstChilds = this.props.taxon.firstChilds;

		// if application is in browser then display BaseMap
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap 
				geojson={geojson} 
				theme={base} 
			/>
		}

		if (firstChilds.size !== 0) {
				chart = <BarChart
					data={firstChilds.slice(0, 5).toJS()}
					width={600}
					height={200}
					margins={{top: 10, right: 20, bottom: 60, left: 55}}
					fill="#3182bd"
					title="Répartition des taxon enfants"
				/>;
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
						brothers={this.props.brothersNav.brothers}
						left={this.props.brothersNav.left}
						right={this.props.brothersNav.right}
					/>
				</Header>
				<Search 
					label={searchLabel} 
					parentsCdnom={parentsCdnom}
				/>
				<section className="flex fdrr fjb">
					<div className="panel-right">
						<PanelInformations info={info} />
						{chart}
					</div>
					{map}
				</section>
			</article>
		);	
	}
}

Taxon = connectToStores(Taxon, [ TaxonStore, BrothersNavigationStore ], (stores, props) => {
	return {
		taxon        : stores.TaxonStore.getState(),
		brothersNav  : stores.BrothersNavigationStore.getState()
	}
});

export default Taxon;
