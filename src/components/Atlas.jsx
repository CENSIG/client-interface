import React						 from "react";
import BarChart				   from "../thirdparty/react-d3/src/barchart/BarChart"
import AtlasStore				 from "../stores/AtlasStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";
import ExploreSubTaxon	 from "./ExploreSubTaxon";
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

	shouldComponentUpdate(nextProps) {
		if (this.props.current === null) {
			return true;	
		}
		return nextProps.current !== this.props.current;
	}

	_getMap() {
		var map;
		// if application is in browser then display BaseMap
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap 
				geojson={this.props.geojson} 
				theme={base} 
			/>
		}
		return map;
	}

	_getChart() {
		var chart;
		if (this.props.firstChilds.size !== 0) {
			chart = <BarChart
				className="card"
				nameLabelProp="name"
				nameValueProp="observations"
				data={this.props.firstChilds.slice(0, 5).toJS()}
				width={600}
				height={200}
				margins={{top: 10, right: 20, bottom: 60, left: 55}}
				fill="#3182bd"
				title="Répartition des taxon enfants"
			/>;
		}
		return chart;
	}

	render() {
		return (
			<article className="atlas">	
				<Header className="flex fdc">
					<div className="flex fjb">
						<h1 className="mainTitle">Bienvenue sur l'atlas des {this.props.info.get("nom")}</h1>
						<ExploreSubTaxon />
					</div>
				</Header>
				<Search 
					label={this.props.info.get("nom")} 
					parentsCdnom={this.props.info.get("id")}
				/>
				<section className="flex fdrr fjb">
					<div className="panel-right">
						<PanelInformations info={this.props.info} />
						{this._getChart()}
					</div>
					{this._getMap()}
				</section>
			</article>
		);
	}
}

Atlas.contextTypes = {
	executeAction: React.PropTypes.func
};

Atlas = connectToStores(Atlas, [ AtlasStore ], (stores, props) => {
	return stores.AtlasStore.getState();
});

export default Atlas;

