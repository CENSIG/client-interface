import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

/**
 * Store for manage taxon research
 * @author Jean BOUDET
 */
class SearchStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.results        = Immutable.List();
		this.pendingRequest = null;
		this.notResults     = null;
	}

	_handleSearchPending(req) {
		this.pendingRequest = req;
		this.emitChange();
	}

	_handleResults(results) {
		this.results    = Immutable.fromJS(results);
		this.emitChange();
	}

	_handleResetSearch() {
		this.results        = Immutable.List();
		this.pendingRequest = null;
		this.notResults			= null;
		this.emitChange();
	}

	_handleNotResults(q) {
		this.results    = Immutable.List();
		this.notResults = q
		this.emitChange();
	}

	getState() {
		return {
			results: this.results,
			notResults: this.notResults,
			pendingRequest: this.pendingRequest
		};
	}

	getResults() {
		return this.results;	
	}
}

SearchStore.storeName = "SearchStore";
SearchStore.handlers = {};
SearchStore.handlers[Event.REQUEST_SEARCH_PENDING] = "_handleSearchPending";
SearchStore.handlers[Event.SEARCH_CHILDS] = "_handleResults";
SearchStore.handlers[Event.NOT_SEARCH_CHILDS] = "_handleNotResults";
SearchStore.handlers[Event.RESET_SEARCH_CHILDS] = "_handleResetSearch";

export default SearchStore;
