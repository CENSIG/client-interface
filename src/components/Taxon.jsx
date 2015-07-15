import React							from "react";
import BrothersNavigationStore from "../stores/BrothersNavigationStore";
import AtlasStore from "../stores/AtlasStore";
import InfoStore  from "../stores/InfoStore";
import ParentsStore  from "../stores/ParentsStore";
import {connectToStores}  from "fluxible/addons";
import Template					  from "./Template";

/**
 * A component to display a taxon of atlas
 * @author Jean BOUDET
 */
class Taxon extends React.Component
{
	constructor(props) {
		super(props);
	}

	/*shouldComponentUpdate(nextProps) {
		if (this.props.taxon.current === null) {
			return true;	
		}
		return nextProps.taxon.current !== this.props.taxon.current;
	}*/

	render() {
		return <Template component="taxon" {...this.props} />; 
	}
}

Taxon = connectToStores(Taxon, [ AtlasStore, InfoStore, ParentsStore ], (stores, props) => {
	return {
		atlas: stores.AtlasStore.getState(),
		info: stores.InfoStore.getState(),
		parents: stores.ParentsStore.getState()
	}
});

export default Taxon;
