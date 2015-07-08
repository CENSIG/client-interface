import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class FirstChildsStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.firstChilds = Immutable.List();
	}

	_handleFirstChild(firstChilds) {
		this.firstChilds = firstChilds;
		this.emitChange();
	}

	_handleNotFirstChilds() {
		this.firstChilds = Immutable.List();
		this.emitChange();
	}

	getState() {
		return this.firstChilds;	
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.firstChilds = Immutable.fromJS(state);	
	}
}

FirstChildsStore.storeName = "FirstChildsStore";
FirstChildsStore.handlers = {};
FirstChildsStore.handlers[Event.FIRST_CHILDS] = "_handleFirstChild";
FirstChildsStore.handlers[Event.NOT_FIRST_CHILDS] = "_handleNotFirstChilds";

export default FirstChildsStore;
