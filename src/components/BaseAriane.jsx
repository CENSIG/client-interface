import React from "react";
import {Ariane} from "client-interface-components";
import {connectToStores}  from "fluxible/addons";
import ParentsStore from "../stores/ParentsStore";


class BaseAriane extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<div>
				<Ariane 
					withLink={true} 
					parents={this.props.parents}
				/>	
			</div>
		)	
	}
}

BaseAriane = connectToStores(BaseAriane, [ ParentsStore ], (stores, props) => {
	return {
		parents: stores.ParentsStore.getState()
	};
});

export default BaseAriane;
