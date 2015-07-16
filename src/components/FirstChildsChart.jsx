import React from "react";
import BarChart	from "../thirdparty/react-d3/src/barchart/BarChart"
import {connectToStores}  from "fluxible/addons";
import FirstChildsStore from "../stores/FirstChildsStore";

class FirstChildsChart extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_getChart() {
		var chart = null;
		if (this.props.data.size !== 0) {
			chart = <BarChart
				nameLabelProp="name"
				nameValueProp="observations"
				data={this.props.data.slice(0, 5).toJS()}
				margins={{top: 10, right: 20, bottom: 60, left: 55}}
				fill="#3182bd"
				width={600}
				height={200}
				viewBox="0 0 590 200"
			/>;
		}
		return chart;
	}

	render() {
		return (
			<div>{this._getChart()}</div>
		);	
	}
}

FirstChildsChart = connectToStores(FirstChildsChart, [ FirstChildsStore ], (stores, props) => {
	return {
		data: stores.FirstChildsStore.getState()	
	};
});

export default FirstChildsChart;
