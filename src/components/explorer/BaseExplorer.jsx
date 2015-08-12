import React from "react";
import {Explorer} from "client-interface-components";
import {connectToStores}  from "fluxible/addons";
import Spinner from "react-spinkit";

import ExploreAction from "../../actions/ExploreAction";
import ExploreStore from "../../stores/ExploreStore";
import ComposeExplorerView from "./ComposeExplorerView";
import LoadingForComponent from "../pages/LoadingForComponent";

// style for div container
const style = {
	position: "fixed",
	right: "10px",
	top: "20px",
	zIndex: 1030
};

// style for explrer button
const styleButton = {
	"cursor": "pointer",
	"margin": "0 0 0 auto"
}

// style for spinner
const styleLoading = {
	height: 50,
	margin: "30px auto 0",
	width: "1%"
};

/*
 * Component for display explorer
 * @author Jean BOUDET
 */
class BaseExplorer extends React.Component
{
	constructor(props) {
		super(props);
	}

	// When an ariane taxon is clicked
	_actionClickSup(name, cdnom) {
		this.context.executeAction(ExploreAction.exploreSubTaxon, {
			api: this.context.api,
			event: "sup",
			name: name,
			cdnom: cdnom
		});
	}

	// When button explorer view is clicked
	_actionClickSub(name, cdnom) {
		this.context.executeAction(ExploreAction.exploreSubTaxon, {
			api: this.context.api,
			event:"sub",
			name: name,
			cdnom: cdnom
		});
	}

	render() {
		let props = this.props;
		return (
			<div style={style}>
				<Explorer
					styleButton={styleButton}
					buttonMaterial={props.buttonMaterial}
					parents={props.parents}
					firstChilds={props.firstChilds}
					actionClickSup={this._actionClickSup.bind(this)}	
					actionClickSub={this._actionClickSub.bind(this)}
					withCompose={ComposeExplorerView}
					displaySpin={props.pendingRequest}
					withSpin={<LoadingForComponent style={styleLoading}/>}
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

BaseExplorer = connectToStores(BaseExplorer, [ ExploreStore ], (context, props) => {
	return context.getStore(ExploreStore).getState();
});

export default BaseExplorer;
