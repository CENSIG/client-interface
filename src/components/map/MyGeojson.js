import React from "react";
import Leaflet from "leaflet";
import {GeoJson} from "react-leaflet";

/**
 * A GeoJson component which update itself
 * @author Jean BOUDET
 */
class MyGeojson extends GeoJson {

	componentWillUpdate(prevProps) {
		if (prevProps.data !== this.props.data) {
			this.leafletElement.clearLayers();	
		}	
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data) {
			this.leafletElement.addData(this.props.data);
		}
	}
}

MyGeojson.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default MyGeojson;
