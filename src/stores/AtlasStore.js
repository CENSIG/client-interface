import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";
import ParentsStore from "./ParentsStore";

/**
 * A store for Atlas
 * @author Jean BOUDET
 */
class AtlasStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.current = Immutable.Map();
	}

	_handleCurrentAtlas(current) {
		this.current = Immutable.fromJS(current);
		this.emitChange();
	}

	getState() {
		return {
			current: this.current
		}
	}
	
	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.current = Immutable.fromJS(state.current);
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers = {};
AtlasStore.handlers[Event.ATLAS] = "_handleCurrentAtlas";

export default AtlasStore;
