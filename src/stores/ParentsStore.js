import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

/**
 * A store for parents
 * @author Jean BOUDET
 */
class ParentsStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.parents = Immutable.List();
	}

	_handleParents(parents) {
		this.parents = parents;
		this.emitChange();
	}

	getState() {
		return this.parents;	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.parents = Immutable.fromJS(state);
	}
}
	

ParentsStore.storeName               = "ParentsStore";
ParentsStore.handlers                = {};
ParentsStore.handlers[Event.PARENTS] = "_handleParents";

export default ParentsStore;
