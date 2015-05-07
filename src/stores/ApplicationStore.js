/**
 * Store for Application
 * @author Jean BOUDET
 */

var createStore = require("fluxible/addons/createStore");
var routes      = require("../configs/routes");

var ApplicationStore = createStore({
	storeName: "ApplicationStore",

	handlers : {
		"UPDATE_TITLE" : "_handleTitle"
	},

	initialize: function(dispatcher) {
		this.currentTitlePage = null;
		this.pages            = routes;
	},

	_handleTitle: function(title) {
		this.currentTitlePage = title.label;		
		this.emitChange();
	},

	getCurrentPageName: function() { return this.currentPageName; },

	getCurrentTitlePage: function() { return this.currentTitlePage; },

	getState: function() {
		return {
			currentPageName  : this.currentPageName,
			currentPage      : this.currentPage,
			currentRoute     : this.currentRoute,
			currentTitlePage : this.currentTitlePage,
			pages            : this.pages
		}	
	},

	dehydrate: function() {
		return this.getState();	
	},

	rehydrate: function(state) {
		this.currentTitlePage = state.currentTitlePage;
		this.currentPageName  = state.currentPageName;
		this.currentRoute     = state.currentRoute;
		this.currentPage      = state.currentPage;
		this.pages            = state.pages;
	}
});

module.exports = ApplicationStore;
