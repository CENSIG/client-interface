import React						 from "react";
import AtlasStore				 from "../stores/AtlasStore";
import {connectToStores} from "fluxible/addons";
import Template					 from "./Template";

/**
 * A component for Atlas
 * @author Jean BOUDET
 */
class Atlas extends React.Component
{
	constructor(props, context) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.current === null) {
			return true;	
		}
		return nextProps.id !== this.props.id;
	}

	render() {
		return <Template component="atlas" {...this.props} />
	}
}

Atlas.contextTypes = {
	executeAction: React.PropTypes.func
};

Atlas = connectToStores(Atlas, [ AtlasStore ], (stores, props) => {
	return stores.AtlasStore.getState();
});

export default Atlas;

