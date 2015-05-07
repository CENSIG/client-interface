var data = require("../actions/TaxonActions");

module.exports = {
	index: {
		path: "/",
		method: "get",
		label: "Index",
		page: "index",
		handler: require("../components/Index"),
		action: function(context, payload, done) {
			context.dispatch("UPDATE_TITLE", { label: "Bienvenue sur l'application WebOb's"})	
			done();
		}
	},

	"papillons": {
		path: "/papillons",
		method: "get",
		label: "Papillons",
		page: "papillons",
		handler: require("../components/Taxon"),
		action: function(context, payload, done) {
			context.dispatch("UPDATE_TITLE", { label: "WebOb's | Atlas Papillons"});
			context.dispatch("RECEIVE_INFO", { info: data.infos["185214"] });
			done();
		}
	}
};
