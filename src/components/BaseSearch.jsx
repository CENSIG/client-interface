import React from "react";
import SearchStore	 from "../stores/SearchStore";
import SearchAction from "../actions/SearchAction";
import {connectToStores} from "fluxible/addons";
import {Search} from "client-interface-components";

class BaseSearch extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_actionSearch(q, cdnom) {
		this.context.executeAction(SearchAction.getSearchChild, {
			api: this.context.api,
			cdnom: cdnom,
			options: { q: q }
		});
	}

	_actionReset() {
		this.context.executeAction(SearchAction.resetSearch);
	}

	_actionAbort(req) {
		req.abort();	
	}

	render() {
		return (
			<div>
				<Search
					label={this.props.label}
					parentsCdnom={this.props.parentsCdnom}
					results={this.props.results}
					notResults={this.props.notResults}
					pendingRequest={this.props.pendingRequest}
					actionSearch={this._actionSearch.bind(this)}
					actionReset={this._actionReset.bind(this)}
					actionAbort={this._actionAbort}
				/>
			</div>
		);	
	}
}

BaseSearch.contextTypes = {
	executeAction : React.PropTypes.func,
	api           : React.PropTypes.object
}

BaseSearch = connectToStores(BaseSearch, [ SearchStore ], (stores, props) => {
	return stores.SearchStore.getState();
});

export default BaseSearch;
