import React from "react";
import {ExploreSubTaxon} from "client-interface-components";
import ExploreAction from "../actions/ExploreAction";
import ExploreStore from "../stores/ExploreStore";
import {connectToStores}  from "fluxible/addons";

class BaseExplorer extends React.Component
{
	constructor(props) {
		super(props);
	}

	_actionClickSup(name, cdnom) {
		this.context.executeAction(ExploreAction.exploreSubTaxon, {
			api: this.context.api,
			event: "sup",
			name: name,
			cdnom: cdnom
		});
	}

	_actionClickSub(name, cdnom) {
		this.context.executeAction(ExploreAction.exploreSubTaxon, {
			api: this.context.api,
			event:"sub",
			name: name,
			cdnom: cdnom
		});
	}

	render() {
		return (
			<div className={this.props.className}>
				<ExploreSubTaxon 
					buttonMaterial={this.props.buttonMaterial}
					parents={this.props.parents}
					firstChilds={this.props.firstChilds}
					actionClickSup={this._actionClickSup.bind(this)}	
					actionClickSub={this._actionClickSub.bind(this)}
				/>
			</div>
		);
	}
}

BaseExplorer.defaultProps = {
	buttonMaterial: false
};

BaseExplorer.contextTypes = {
	executeAction: React.PropTypes.func,
	api: React.PropTypes.object
};

BaseExplorer = connectToStores(BaseExplorer, [ ExploreStore ], (stores, props) => {
	return stores.ExploreStore.getState();
});

export default BaseExplorer;
