import BaseStore from "fluxible/addons/BaseStore";
import Event from "../utils/Event";

/**
 * Store for Application
 * @author Jean BOUDET
 */
class ApplicationStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.currentTitlePage = null;
	}
	
	_handleTitle(title) {
		this.currentTitlePage = title;
		this.emitChange();
	}

	getCurrentTitlePage() {
		return this.currentTitlePage;
	}

	getState() {
		return {
			currentTitlePage : this.currentTitlePage
		};
	}
	
	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.currentTitlePage = state.currentTitlePage;
	}
}

ApplicationStore.storeName = "ApplicationStore";
ApplicationStore.handlers = {};
ApplicationStore.handlers[Event.UPDATE_TITLE] = "_handleTitle";

export default ApplicationStore;
