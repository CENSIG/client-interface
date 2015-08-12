import React						 from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import AtlasStore				 from "../../stores/AtlasStore";
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

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return <Template component="atlas" {...this.props} />
	}
}

Atlas.contextTypes = {
	executeAction: React.PropTypes.func
};

Atlas = connectToStores(Atlas, [ AtlasStore ], (context, props) => {
	return context.getStore(AtlasStore).getState();
});

export default Atlas;

