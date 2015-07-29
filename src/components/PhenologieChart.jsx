import React from "react";
import {connectToStores} from "fluxible/addons";

import PhenologieStore from "../stores/PhenologieStore";
import SeveralBarChart from "../thirdparty/react-d3/src/severalBarChart/SeveralBarChart";

class PhenologieChart extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_getChart(data) {
		var chart = null;
		if (data.size !== 0) {
			chart = <SeveralBarChart
				legend={true}
				nameLabelProp="mois"
				nameValueProp={["total","adultes","larves"]}
				data={data.toJS()}
				margins={{top: 5, right: 20, bottom: 110, left: 60}}
				widthWithLegend="100%"
				viewBox="0 0 470 120"
				width="500"
				height={200}
			/>;
		}
		return chart; 
	}

	render() {
		return (
			<div>
				{this._getChart(this.props.data)}
			</div>
		)	
	}
}

PhenologieChart = connectToStores(PhenologieChart, [ PhenologieStore ], (context, props) => {
	return {
		data: context.getStore(PhenologieStore).getState()
	}
});

export default PhenologieChart;
