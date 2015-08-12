import React from "react";
import SearchStore	 from "../../stores/SearchStore";
import SearchAction from "../../actions/SearchAction";
import {connectToStores} from "fluxible/addons";
import {Search} from "client-interface-components";

import ComposeSearchResultContent from "./ComposeSearchResultContent";
import LoadingForComponent from "../pages/LoadingForComponent";

// Header for results
const header = [
	"Taxon référent",
	"Nom"
];

// Style spinner
const styleLoading = {
	bottom: 39,
	right: 10,
	position: "relative",
	float: "right"
};

/**
 * Component for display search control
 * @author Jean BOUDET
 */
class BaseSearch extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			backDropShow: false	
		}
	}

	// When letter (>3) is enter
	_actionSearch(q) {
		this.context.executeAction(SearchAction.getSearchChild, {
			api: this.context.api,
			cdnom: this.props.cdnom,
			options: { q: q }
		});
	}

	// When input is blur or not contain value
	_actionReset() {
		this.context.executeAction(SearchAction.resetSearch);
	}

	_actionAbort() {
	
	}

	// When input is focused
	_handleOnFocus(e) {
		this.setState({
			backDropShow: true	
		});
	}

	// When input is leave
	_handleOnBlur(e) {
		e.target.value = "";
		this._actionReset();
		this.setState({
			backDropShow: false
		});
	}

	render() {
		let displaySpin = (this.props.pendingRequest) ? true : false;
		return (
			<Search
				backDropShow={this.state.backDropShow}
				actionSearch={this._actionSearch.bind(this)}
				actionReset={this._actionReset.bind(this)}
				actionAbort={this._actionAbort}
				_onFocus={this._handleOnFocus.bind(this)}
				_onBlur={this._handleOnBlur.bind(this)}
				header={header}
				displaySpin={displaySpin}
				withSpin={<LoadingForComponent style={styleLoading} />}
				withCompose={ComposeSearchResultContent}
				{...this.props}
			/>
		);	
	}
}

BaseSearch.contextTypes = {
	executeAction : React.PropTypes.func,
	api           : React.PropTypes.object
}

BaseSearch = connectToStores(BaseSearch, [ SearchStore ], (context, props) => {
	return context.getStore(SearchStore).getState();
});

export default BaseSearch;
