import React							from "react";
import BrothersNavigationStore from "../../stores/BrothersNavigationStore";
import AtlasStore from "../../stores/AtlasStore";
import InfoStore  from "../../stores/InfoStore";
import ParentsStore  from "../../stores/ParentsStore";
import {connectToStores}  from "fluxible/addons";
import Template					  from "./Template";
import shouldPureComponentUpdate from "react-pure-render/function";

/**
 * A component to display a taxon of atlas
 * @author Jean BOUDET
 */
class Taxon extends React.Component
{
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return <Template component="taxon" {...this.props} />; 
	}
}

Taxon = connectToStores(Taxon, [ AtlasStore, InfoStore, ParentsStore ], (context, props) => {
	return {
		atlas: context.getStore(AtlasStore).getState(),
		info: context.getStore(InfoStore).getState().general,
		parents: context.getStore(ParentsStore).getState()
	}
});

export default Taxon;
