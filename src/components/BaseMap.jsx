import React										 from "react";
import TaxonStore								 from "../stores/TaxonStore";
import {connectToStores}				 from "fluxible/addons";
import {Map, TileLayer, GeoJson} from "react-leaflet";

if (process.env.BROWSER ) {
	require("../../node_modules/leaflet/dist/leaflet.css");
	require("../assets/css/base/map.css");
}

class BaseMap extends React.Component
{
	constructor(props) {
		super(props);
	}

	render() {
		var geojson;

		if (this.props.geojson.hasOwnProperty("type")) {
			geojson = <GeoJson data={this.props.geojson} />;
		}

		return (
			<Map className="map" center={[43.6109200, 3.8772300]} zoom={8}>
				<TileLayer
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				{geojson}
			</Map>
		);
	}
}

BaseMap = connectToStores(BaseMap, [ TaxonStore ], (stores, props) => {
	return {
		geojson: stores.TaxonStore.getGeoJson()
	}
});

export default BaseMap;


