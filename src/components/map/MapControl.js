import React										 from "react";
import {MapComponent}						 from "react-leaflet";

/**
 * A class for integrate leaflet control on
 * react-leaflet librairie
 * @author Jean BOUDET
 */
class MapControl extends MapComponent
{
	componentDidMount() {
		super.componentDidMount();	
		this.props.map.addControl(this.leafletElement);
	}

	componentWillUnMount() {
		super.componentWillUnMount();
		this.props.map.removeControl(this.leafletElement);
	}
}

export default MapControl;
