import React						 from "react";
import BarChart				   from "../../thirdparty/react-d3/src/barchart/BarChart"
import PanelInformations from "../../components/PanelInformations";
import {ExploreSubTaxon}	 from "../../components/exploreSubTaxon";
import Header						 from "../../components/Header";
import {Search}						 from "../../components/search";
import {base}						 from "../../configs/themesForMap";

// if application is in browser then require BaseMap
if (process.env.BROWSER && typeof window !== "undefined") {
	require("./css/atlas.css");
	var BaseMap = require("../../components/map").BaseMap;
}
		
export default function(props) {
	var map, chart;

	if (process.env.BROWSER && typeof window !== "undefined") {
		map = <BaseMap 
			geojson={props.geojson} 
			theme={base} 
		/>;
	}

	if (props.firstChilds.size > 0) {
		chart = <BarChart
			className="card"
			nameLabelProp="name"
			nameValueProp="observations"
			data={props.firstChilds.slice(0, 5).toJS()}
			width={600}
			height={200}
			margins={{top: 10, right: 20, bottom: 60, left: 55}}
			fill="#3182bd"
			title="Répartition des principaux taxons enfants observés"
		/>;
	}

	return (
		<article className="atlas">	
			<Header className="flex fdc">
				<div className="flex fjb">
					<h1 className="mainTitle">Bienvenue sur l'atlas des {props.info.get("nom")}</h1>
					<ExploreSubTaxon />
				</div>
			</Header>
			<Search 
				label={props.info.get("nom")} 
				parentsCdnom={props.info.get("id")}
			/>
			<section className="flex fdrr fjb">
				<div className="panel-right">
					<PanelInformations info={props.info} />
					{chart}
				</div>
				{map}
			</section>
		</article>
	);
}
