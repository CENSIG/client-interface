/**
 * Fluxible wrapper
 * @author Jean BOUDET
 */
import Fluxible					from "fluxible";
import BaseRouteStore		from "./stores/BaseRouteStore";
import Application			from "./components/Application";
import ApplicationStore from "./stores/ApplicationStore";
import TaxonStore				from "./stores/TaxonStore";
import SearchTaxonStore	from "./stores/SearchTaxonStore";

var app = new Fluxible({
	component: Application // Top component context
});

app.registerStore(ApplicationStore);
app.registerStore(BaseRouteStore);
app.registerStore(TaxonStore);
app.registerStore(SearchTaxonStore);

export default app;
