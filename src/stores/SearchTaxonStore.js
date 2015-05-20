import BaseStore from "fluxible/addons/BaseStore";

/**
 * Store for manage taxon research
 * @author Jean BOUDET
 */
class SearchTaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.results        = [];
		this.pendingRequest = null;
	}

	_handleSearchPending(req) {
		if (this.pendingRequest) {
			this.pendingRequest.abort();	
		}
		this.pendingRequest = req;
	}

	_handleResults(results) {
		this.results = results;	
		this.emitChange();
	}

	_handleResetSearch(reset) {
		this.results        = reset.results;
		this.pendingRequest = reset.pendingRequest;
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
