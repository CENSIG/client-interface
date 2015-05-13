import React from "react";
import Leaflet from "leaflet";
import MapControl from "./MapControl";

/**
 * A class for display legend item
 * @author Jean BOUDET
 */
class LegendItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		var style = {
			background: this.props.color	
		};
		return (
			<div className="legend-item">
				<i style={style}></i>
				<span>{this.props.inf}{this.props.sup}</span>
			</div>
		);
	}
}

/**
 * A class for create legend on leaflet map
 * @author Jean BOUDET
 */
class Legend extends MapControl
{
	componentWillMount() {
		this.leafletElement = Leaflet.control({position: this.props.position});
	}

	render() {
		this.leafletElement.onAdd = (map) => {
			var legendHTML = Leaflet.DomUtil.create("div", "map-legend");
			var grades = this.props.theme.grades;
			for (var i = 0; i < grades.length; i++) {
				var inf = grades[i];
				var sup = (grades[i + 1]) ? "-"+grades[i + 1] : "+"
				legendHTML.innerHTML += React.renderToStaticMarkup(
					<LegendItem inf={grades[i]} sup={sup} color={this.props.theme.colors(grades[i])} />
				);
			}
			return legendHTML;
		};
		return null;
	}
}

Legend.propTypes = {
	position: React.PropTypes.string.isRequired,
	theme: React.PropTypes.object.isRequired
}

export default Legend;
