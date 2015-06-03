import React						 from "react";
import {BarChart}				 from "react-d3/barchart"
import AtlasStore				 from "../stores/AtlasStore";
import {connectToStores} from "fluxible/addons";
import PanelInformations from "./PanelInformations";
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
		return nextProps.info.get("id") !== this.props.info.get("id");
	}

	render() {
		var map, chart;
		// if application is in browser then display BaseMap
		if (process.env.BROWSER && typeof window !== "undefined") {
			map = <BaseMap 
				geojson={this.props.geojson} 
				theme={base} 
			/>
		}

		if (this.props.firstChilds.size !== 0) {
				chart = <BarChart
					data={this.props.firstChilds.slice(0, 5).toJS()}
					width={600}
					height={200}
					margins={{top: 10, right: 20, bottom: 60, left: 55}}
					fill="#3182bd"
					title="Répartition des taxon enfants"
				/>;
		}

		return (
			<article className="atlas">	
				<Header className="flex fac">
					<h1 className="mainTitle">Bienvenue sur l'atlas des {this.props.info.get("nom")}</h1>
				</Header>
				<Search 
					label={this.props.info.get("nom")} 
					parentsCdnom={this.props.info.get("id")}
				/>
				<section className="flex fdrr fjb">
					<div className="panel-right">
						<PanelInformations info={this.props.info} />
						{chart}
					</div>
					{map}
				</section>
			</article>
		)	
	}
}

Atlas.contextTypes = {
	executeAction: React.PropTypes.func
};

Atlas = connectToStores(Atlas, [ AtlasStore ], (stores, props) => {
	return stores.AtlasStore.getState();
});

export default Atlas;

