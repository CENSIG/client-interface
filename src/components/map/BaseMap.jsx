import React										 from "react";
import Leaflet									 from "leaflet";
import {Map, TileLayer, GeoJson} from "react-leaflet";
import Legend										 from "./Legend";

if (process.env.BROWSER ) {
	require("../../../node_modules/leaflet/dist/leaflet.css");
	require("../../assets/css/base/map.css");
}

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

	render() {
		var geojson;

		if (this.props.geojson.hasOwnProperty("type")) {
			geojson = <GeoJson 
				data={this.props.geojson} 
				style={this._handleStyle.bind(this)}		
			/>;
		}

		return (
			<Map ref="map" className="map" center={center} zoom={8}>
				<TileLayer
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Legend position="bottomright" theme={this.props.theme}/>
				{geojson}
			</Map>
		);
	}
}

export default BaseMap;


