import BaseStore from "fluxible/addons/BaseStore";
import routes		 from "../configs/routes";

/**
 * Store for Application
 * @author Jean BOUDET
 */
class ApplicationStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.currentTitlePage = null;
		this.pages            = routes;
	}
	
	_handleTitle(title) {
		this.currentTitlePage = title.label;	
		this.emitChange();
	}

	getCurrentTitlePage() {
		return this.currentTitlePage;
	}

	getState() {
		return {
			currentTitlePage: this.currentTitlePage,
			pages: this.pages
		};
	}
	
	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.currentTitlePage = state.currentTitlePage;
		this.pages            = state.pages;
	}
}

ApplicationStore.storeName = "ApplicationStore";
ApplicationStore.handlers = {
	"UPDATE_TITLE": "_handleTitle"
};

export default ApplicationStore;
