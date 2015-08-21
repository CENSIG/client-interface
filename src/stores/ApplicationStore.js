import BaseStore from "fluxible/addons/BaseStore";
import Event from "../utils/Event";
import Immutable from "immutable";

/**
 * Store for Application
 * @author Jean BOUDET
 */
class ApplicationStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.currentTitlePage = null;
		this.auth = Immutable.Map(); 
	}
	
	_handleTitle(title) {
		this.currentTitlePage = title;
		this.emitChange();
	}

	_handleToken(auth) {
		this.auth = Immutable.fromJS(auth);
	}

	getCurrentTitlePage() {
		return this.currentTitlePage;
	}

	getState() {
		return {
			currentTitlePage : this.currentTitlePage,
			auth: this.auth
		};
	}
	
	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.currentTitlePage = state.currentTitlePage;
		this.auth = Immutable.fromJS(state.auth);
	}
}

ApplicationStore.storeName = "ApplicationStore";
ApplicationStore.handlers = {};
ApplicationStore.handlers[Event.UPDATE_TITLE] = "_handleTitle";
ApplicationStore.handlers["ACCESS_TOKEN"] = "_handleToken";

export default ApplicationStore;
