import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

import Event from "../utils/Event";

class ObservateursStore extends BaseStore
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

ObservateursStore.storeName = "ObservateursStore";
ObservateursStore.handlers = {};
ObservateursStore.handlers[Event.SEARCH_OBSERVATEURS] = "_handleResults";
ObservateursStore.handlers[Event.START_REQUEST_OBSERVATEURS] = "_handleStart";
ObservateursStore.handlers[Event.END_REQUEST_OBSERVATEURS] = "_handleEnd";

export default ObservateursStore;
