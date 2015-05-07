/**
 * Fluxible wrapper
 * @author Jean BOUDET
 */
var Fluxible         = require("fluxible"),
		BaseRouteStore   = require("./stores/BaseRouteStore");
		Application      = require("./components/Application"),
		ApplicationStore = require("./stores/ApplicationStore");
		TaxonStore       = require("./stores/TaxonStore");

var app = new Fluxible({
	component: Application // Top component context
});

app.registerStore(ApplicationStore);
app.registerStore(BaseRouteStore);
app.registerStore(TaxonStore);

module.exports = app;
