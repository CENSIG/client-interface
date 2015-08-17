import React from "react";
import {Ariane} from "client-interface-components";
import {connectToStores}  from "fluxible/addons";
import ParentsStore from "../../stores/ParentsStore";

import ComposeArianeItem from "./ComposeArianeItem";
import style from "./style";

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
		return (
			<Ariane 
				styleDivBase={style.base}
				parents={this.props.parents}
				withCompose={ComposeArianeItem}
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
