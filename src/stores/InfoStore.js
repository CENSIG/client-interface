import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class InfoStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info         = Immutable.Map();
		this.monographies = Immutable.List();
	}

	_handleInfo(info) {
		this.info = info;	
		this.emitChange();
	}

	_handleMonographies(monographies) {
		this.monographies = monographies;
		this.emitChange();
	}

	_handleNotMonographies() {
		this.monographies = Immutable.List();
		this.emitChange();
	}

	getState() {
		return {
			general: this.info,
			monographies: this.monographies
		}
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.info         = Immutable.fromJS(state.general);
		this.monographies = Immutable.fromJS(state.monographies);
	}
}

InfoStore.storeName =  "InfoStore";
InfoStore.handlers = {};
InfoStore.handlers[Event.INFO] = "_handleInfo";
InfoStore.handlers[Event.MONOGRAPHIES] = "_handleMonographies";
InfoStore.handlers[Event.NOT_MONOGRAPHIES] = "_handleNotMonographies";

export default InfoStore;
