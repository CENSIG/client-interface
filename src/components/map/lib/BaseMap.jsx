import React										 from "react";
import Leaflet									 from "leaflet";
import {Map, TileLayer, GeoJson} from "react-leaflet";
import Legend										 from "./Legend";
import MyGeojson						     from "./MyGeojson";
import {connectToStores} from "fluxible/addons";
import GeoStore from "../../../stores/GeoStore";


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
		var grille10 = this.props.grille10;
		var style = {
			height : this.props.height,
			width  : this.props.width
		};

		return (grille10.has("type"))
			? ( <Map ref="map" style={style} center={center} zoom={7}>
						<TileLayer
							url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
						/>
						<Legend position="bottomright" theme={this.props.theme} />
						{this.getGeojson(grille10)}
					</Map>
				)
			: <p>Il n'y a pas d'observation</p>;
	}
}

BaseMap.defaultProps = {
	height : style.height,
	width  : style.width
}

BaseMap = connectToStores(BaseMap, [ GeoStore ], (context, props) => {
	return {
		grille10: context.getStore(GeoStore).getState().grille10
	}
});

BaseMap = BaseMap;

export default BaseMap;


