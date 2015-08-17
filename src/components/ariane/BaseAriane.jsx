import React from "react";
import {Ariane} from "client-interface-components";
import {connectToStores}  from "fluxible/addons";
import ParentsStore from "../../stores/ParentsStore";

import ComposeArianeItem from "./ComposeArianeItem";

/**
 * Component for display ariane
 * @author Jean BOUDET
 */
class BaseAriane extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		let props = this.props;
		return (
			<Ariane 
				parents={this.props.parents}
				withCompose={ComposeArianeItem}
				{...props}
			/>	
		)	
	}
}

BaseAriane = connectToStores(BaseAriane, [ ParentsStore ], (context, props) => {
	return {
		parents: context.getStore(ParentsStore).getState()
	};
});

export default BaseAriane;
