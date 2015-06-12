import React							from "react";
import BarChart				    from "../thirdparty/react-d3/src/barchart/BarChart";
import TaxonStore					from "../stores/TaxonStore";
import BrothersNavigationStore from "../stores/BrothersNavigationStore";
import {connectToStores}  from "fluxible/addons";
import PanelInformations  from "./PanelInformations";
import Ariane						  from "./Ariane";
import Header						  from "./Header";
import Search						  from "./Search";
import BrothersNavigation from "./BrothersNavigation";
import ExploreSubTaxon from "./ExploreSubTaxon";
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

	_getMap() {
		var map;
		// if application is in browser then display BaseMap
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap 
				geojson={this.props.taxon.geojson} 
				theme={base} 
			/>
		}
		return map;
	}

	_getChart() {
		var chart;	
		var firstChilds = this.props.taxon.firstChilds;
		if (firstChilds.size !== 0) {
			chart = <BarChart
				data={firstChilds.slice(0,5).toJS()}
				nameLabelProp="name"
				nameValueProp="observations"
				width={600}
				height={200}
				margins={{top: 10, right: 20, bottom: 60, left: 55}}
				fill="#3182bd"
				title="Répartition des taxon enfants"
			/>;
		}
		return chart;
	}

	_getParentInfo() {
		// It's the atlas taxon
		var parents = this.props.taxon.parents;
		var firstParents = parents.first();
		var searchLabel  = (parents.size > 0) ? firstParents.get("name")  : "";
		var parentsCdnom = (parents.size > 0) ? firstParents.get("cdnom") : "";

		return {label: searchLabel, cdnom: parentsCdnom};
	}

	render() {
		return (
			<article className="atlas">	
				<Header className="flex fdc">
					<div className="flex fjb">
						<h1>{this.props.taxon.info.get("nom")}</h1>
						<div>
							<Ariane parents={this.props.taxon.parents} />
							<ExploreSubTaxon 
								firstChilds={this.props.taxon.firstChilds} 
								parents={this.props.taxon.parents}
							/>
						</div>
					</div>
					<BrothersNavigation 
						brothers={this.props.brothersNav.brothers}
						left={this.props.brothersNav.left}
						right={this.props.brothersNav.right}
					/>
				</Header>
				<Search 
					label={this._getParentInfo().label} 
					parentsCdnom={this._getParentInfo().cdnom}
				/>
				<section className="flex fdrr fjb">
					<div className="panel-right">
						<PanelInformations info={this.props.taxon.info} />
						{this._getChart()}
					</div>
					{this._getMap()}
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
