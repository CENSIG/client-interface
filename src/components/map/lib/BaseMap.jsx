import React										 from "react";
import Radium									   from "radium";
import Leaflet									 from "leaflet";
import {Map, TileLayer, GeoJson} from "react-leaflet";
import Legend										 from "./Legend";
import MyGeojson						     from "./MyGeojson";

import style from "../style";

const center = [43.6831302,3.6105679];

/**
 * A component for render Map (with leaflet and react-leaflet)
 * This component is not server side
 * @author Jean BOUDET
 */
class BaseMap extends React.Component
{
	constructor(props) {
		super(props);
	}

	_handleStyle(feature) {
		return {
			fillColor: this.props.theme.colors(feature.properties.nombres),
			weight: 0,
			fillOpacity: 0.8
		}	
	}

	_handleGeojsonPopup(feature, layer) {
		if (feature.properties && feature.properties.nombres) {
			layer.bindPopup("<p>"+feature.properties.nombres+"</p>");
		}	
	}

	getGeojson(data) {
		return (
			<MyGeojson 
				data={data.toJS()} 
				style={this._handleStyle.bind(this)}
				onEachFeature={this._handleGeojsonPopup}
			/>
		);
	}

	render() {
		var data    = this.props.geojson;
		var geojson = data.has("type") ? this.getGeojson(data) : null;

		return (
			<Map ref="map" style={style.base} center={center} zoom={8}>
				<TileLayer
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Legend position="bottomright" theme={this.props.theme} />
				{geojson}
			</Map>
		);
	}
}

BaseMap = Radium(BaseMap);

export default BaseMap;


