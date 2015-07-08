import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class InfoStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info = Immutable.Map();
	}

	_handleInfo(info) {
		this.info = info;	
		this.emitChange();
	}

	getState() {
		return this.info;
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.info = Immutable.fromJS(state);
	}
}

InfoStore.storeName =  "InfoStore";
InfoStore.handlers = {};
InfoStore.handlers[Event.INFO] = "_handleInfo";

export default InfoStore;
