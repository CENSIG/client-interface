import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import SeveralBarChart from "../thirdparty/react-d3/src/severalBarChart/SeveralBarChart";

class PhenologieChart extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate = shouldPureComponentUpdate

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

export default PhenologieChart;
