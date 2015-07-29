import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class PhenologieStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.phenologie = Immutable.List();
	}

	_handlePhenologie(phenologie) {
		this.phenologie = phenologie;
		this.emitChange();
	}

	getState() {
		return this.phenologie;
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.phenologie = Immutable.fromJS(state);	
	}
}

PhenologieStore.storeName = "PhenologieStore";
PhenologieStore.handlers = {};
PhenologieStore.handlers[Event.PHENOLOGIE] = "_handlePhenologie";

export default PhenologieStore;


