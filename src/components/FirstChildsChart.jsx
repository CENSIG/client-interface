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
				accessLabelProp={(d)=>d.cdnom}
				accessValueProp={(d)=>d.observations}
				accessLabelTooltip={(d)=>d.name}
				data={this.props.data.slice(0, 5).toJS()}
				margins={{top: 15, right: 20, bottom: 60, left: 70}}
				fill="#3182bd"
				width={600}
				height={200}
				viewBox="0 0 590 200"
				withTooltip={true}
			/>;
		}
		return chart;
	}

	render() {
		let render = this._getChart();
		
		return (render)
			? (<div>{render}</div>)
			: (<div>Il n'y a pas de fils observés</div>);
	}
}

FirstChildsChart = connectToStores(FirstChildsChart, [ FirstChildsStore ], (context, props) => {
	return {
		data: context.getStore(FirstChildsStore).getState()	
	};
});

export default FirstChildsChart;
