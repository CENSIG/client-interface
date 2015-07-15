import React from "react";
import SearchStore	 from "../stores/SearchStore";
import SearchAction from "../actions/SearchAction";
import {connectToStores} from "fluxible/addons";
import {Search} from "client-interface-components";

class BaseSearch extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			backDropShow: false	
		}
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

	_handleOnFocus(e) {
		this.setState({
			backDropShow: true	
		});
	}

	_handleOnBlur(e) {
		e.target.value = "";
		this.setState({
			backDropShow: false
		});
	}

	render() {
		return (
			<div>
				<Search
					backDropShow={this.state.backDropShow}
					actionSearch={this._actionSearch.bind(this)}
					actionReset={this._actionReset.bind(this)}
					actionAbort={this._actionAbort}
					_onFocus={this._handleOnFocus.bind(this)}
					_onBlur={this._handleOnBlur.bind(this)}
					{...this.props}
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
