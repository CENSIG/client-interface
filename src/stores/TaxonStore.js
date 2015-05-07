var createStore = require("fluxible/addons/createStore");

var TaxonStore = createStore({
	storeName: "TaxonStore",

	handlers: {
		"RECEIVE_INFO": "_handleInfo"
	},

	initialize: function(dispatcher) {
		this.info = {};	
	},

	_handleInfo: function(taxon) {
		this.info = taxon.info;
		this.emitChange();
	},

	getState: function() {
		return {
			info: this.info	
		}	
	},

	dehydrate: function() {
		return this.getState();
	}, 

	rehydrate: function(state) {
		this.info = state.info;
	}
});

module.exports = TaxonStore;
