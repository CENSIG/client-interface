import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class GeoStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.grille10 = Immutable.Map();
	}

	_handleGrille10(grid) {
		this.grille10 = grid;	
		this.emitChange();
	}

	_handleNotGrille10() {
		this.grille10 = Immutable.Map();
		this.emitChange();
	}

	getState() {
		return {
			grille10: this.grille10	
		}	
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.grille10 = Immutable.fromJS(state.grille10);
	}
}

GeoStore.storeName = "GeoStore";
GeoStore.handlers = {};
GeoStore.handlers[Event.GRILLE_10] = "_handleGrille10";
GeoStore.handlers[Event.NOT_GRILLE_10] = "_handleNotGrille10";

export default GeoStore;

