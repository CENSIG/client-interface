import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

/**
 * Store for manage taxon research
 * @author Jean BOUDET
 */
class SearchTaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.results        = Immutable.List();
		this.pendingRequest = null;
	}

	_handleSearchPending(req) {
		if (this.pendingRequest) {
			this.pendingRequest.abort();	
		}
		this.pendingRequest = req;
	}

	_handleResults(results) {
		this.results = Immutable.fromJS(results);
		this.emitChange();
	}

	_handleResetSearch() {
		this.results        = Immutable.List();
		this.pendingRequest = null;
		this.emitChange();
	}

	getResults() {
		return this.results;	
	}
}

SearchTaxonStore.storeName = "SearchTaxonStore";
SearchTaxonStore.handlers = {
	"REQUEST_SEARCH_PENDING" : "_handleSearchPending",
	"RECEIVE_RESULTS"        : "_handleResults",
	"RESET_SEARCH"					 : "_handleResetSearch"
};

export default SearchTaxonStore;
