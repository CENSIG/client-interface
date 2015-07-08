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
		this.id = null;
		this.name = null;
	}

	_handleCurrentAtlas(parents) {
		this.dispatcher.waitFor(ParentsStore, () => {
			var current = parents.first();
			this.id     = current.get("cdnom");
			this.name   = current.get("name");
			this.emitChange();
		});
	}

	getState() {
		return {
			id: this.id,
			name: this.name
		};
	}
	
	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.id = state.id;
		this.name = state.name;
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers = {};
AtlasStore.handlers[Event.PARENTS] = "_handleCurrentAtlas";

export default AtlasStore;
