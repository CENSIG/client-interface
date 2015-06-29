import React						 from "react";
import SearchTaxonAction from "../../../actions/SearchTaxonAction";
import SearchTaxonStore	 from "../../../stores/SearchTaxonStore";
import {connectToStores} from "fluxible/addons";

import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

/**
 * Element for search taxon
 * @author Jean BOUDET
 */
class Search extends React.Component
{
	constructor(props, context) {
		super(props, context);
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.results.size === 0) {
			return true;	
		}
		return nextProps.results !== this.props.results;	
	}

	_handleKeyUp(e) {
		var q = e.target.value;
		if (q.length > 3) {
			var cdnom = this.props.parentsCdnom; 
			this.context.executeAction(SearchTaxonAction.getSearchChild, {
				cdnom: cdnom,
				options: { q: q }
			});
		}

		if (q.length == 0) {
			this.context.executeAction(SearchTaxonAction.resetSearch);
		}
	}

	render() {
		var placeholder = "Recherchez un taxon spécifique dans les "+this.props.label;
		return (
			<div>
				<SearchInput placeholder={placeholder} _onKeyUp={this._handleKeyUp.bind(this)} />
				<SearchResult 
					results={this.props.results} 
					notResults={this.props.notResults}
				/>
			</div>
		);
	}
}

Search.contextTypes = {
	executeAction : React.PropTypes.func,
	getStore      : React.PropTypes.func
}

Search = connectToStores(Search, [ SearchTaxonStore ], (stores, props) => {
	return stores.SearchTaxonStore.getState();
});

export default Search;
