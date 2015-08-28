import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

import Event from "../utils/Event";

class CommunesStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.results        = Immutable.List();
		this.pendingRequest = null;
	}

	_handleResults(res) {
		this.results = res;	
		this.emitChange();
	}

	_handleStart() {
		this.pendingRequest = true;
		this.emitChange();
	}

	_handleEnd() {
		this.pendingRequest = false;	
		this.emitChange();
	}

	getState() {
		return {
			results: this.results,
			pendingRequest: this.pendingRequest
		};	
	}

	dehydrate() {
		return this.getState;	
	}

	rehydrate(state) {
		this.results = Immutable.fromJS(state.results);
		this.pendingRequest = state.pendingRequest;
	}
}

CommunesStore.storeName = "CommunesStore";
CommunesStore.handlers = {};
CommunesStore.handlers[Event.SEARCH_COMMUNES] = "_handleResults";
CommunesStore.handlers[Event.START_REQUEST_COMMUNES] = "_handleStart";
CommunesStore.handlers[Event.END_REQUEST_COMMUNES] = "_handleEnd";

export default CommunesStore;
