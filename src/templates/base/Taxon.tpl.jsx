import React from "react";

import BarChart				    from "../../thirdparty/react-d3/src/barchart/BarChart";
import PanelInformations  from "../../components/PanelInformations";
import {Ariane}						  from "../../components/ariane";
import Header						  from "../../components/Header";
import {Search}						  from "../../components/search";
import {BrothersNavigation} from "../../components/brothersNavigation";
import {ExploreSubTaxon}    from "../../components/exploreSubTaxon";
import {base}						  from "../../configs/themesForMap";

if (process.env.BROWSER && typeof window !== "undefined") {
	var BaseMap = require("../../components/map").BaseMap;
}

export default function(props) {
	var map, chart;

	if (process.env.BROWSER && typeof window !== "undefined") {
		map = <BaseMap 
			geojson={props.taxon.geojson} 
			theme={base} 
		/>
	}

	if (props.taxon.firstChilds.size > 0) {
		chart = <BarChart
			data={props.taxon.firstChilds.slice(0,5).toJS()}
			nameLabelProp="name"
			nameValueProp="observations"
			width={600}
			height={200}
			margins={{top: 10, right: 20, bottom: 60, left: 55}}
			fill="#3182bd"
			title="Répartition des principaux taxons enfants observés"
		/>;
	}

	var parents = props.taxon.parents;
	var firstParents = parents.first();
	var searchLabel  = (parents.size > 0) ? firstParents.get("name")  : "";
	var parentsCdnom = (parents.size > 0) ? firstParents.get("cdnom") : "";

	return (
		<article className="atlas">	
			<Header className="flex fdc">
				<div className="flex fjb">
					<h1>{props.taxon.info.get("nom")}</h1>
					<div>
						<Ariane withLink={true} parents={parents} />
						<ExploreSubTaxon />
					</div>
				</div>
				<BrothersNavigation 
					brothers={props.brothersNav.brothers}
					left={props.brothersNav.left}
					right={props.brothersNav.right}
				/>
			</Header>
			<Search 
				label={searchLabel} 
				parentsCdnom={parentsCdnom}
			/>
			<section className="flex fdrr fjb">
				<div className="panel-right">
					<PanelInformations info={props.taxon.info} />
					{chart}
				</div>
				{map}
			</section>
		</article>
	);	
}
